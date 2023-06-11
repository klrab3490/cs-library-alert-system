import { auth, db } from '@lib/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { arrayUnion, collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const Search = () => {
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
    const [userID, setUserID] = useState('');
    const [value, setValue] = useState('');

    const handleSearch = (e) => {
        setValue(e.target.value);
    };
    
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "Books"), (snapShot) => {
            let list = [];
            snapShot.docs.forEach(doc => {
                list.push({ id: doc.id, ...doc.data() });
            });
            setData(list);
        }, (error) => {
            console.log(error);
        });

        const userdata = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                setUserID(user.uid);
            } else {
                setUser(null);
                setUserID(null);
            }
        });

        return () => {
            unsub();
            userdata();
        };
    }, []);

    const filteredData = data.filter((item) => {
        return item.book.toLowerCase().includes(value.toLowerCase());
    });

    const handleAddToCart = async (item) => {
        const docRef = doc(db, "Books", item);
        const docSnap = await getDoc(docRef);
        if (docSnap.data().available === 0) {
            alert("Book is not available");
            return;
        }

        // Add To Cart
        const docRef1 = doc(db, "Cart", userID);
        const docSnap1 = await getDoc(docRef1);
        if (docSnap1.exists()) {
            if (docSnap1.data().books.includes(item)) {
                alert("Book is already in cart");
                return;
            } else {
                await updateDoc(docRef1, {
                    books: arrayUnion(item),
                });
                await updateDoc(docRef, {
                    borrowedby: arrayUnion(userID),
                    available: parseInt(docSnap.data().available - 1),
                });
            }
        } else {
            await setDoc(docRef1, {
                books: arrayUnion(item),
            });
            await updateDoc(docRef, {
                borrowedby: arrayUnion(userID),
                available: parseInt(docSnap.data().available - 1),
            });
        }
    };

    const handleAddToWishlist = async (item) => {
        const docRef = doc(db, "Wishlist", userID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            if (docSnap.data().books.includes(item)) {
                alert("Book is already in wishlist");
                return;
            } else {
                await updateDoc(docRef, {
                    books: arrayUnion(item),
                    date: arrayUnion(new Date()),
                });
            }
        } else {
            await setDoc(docRef, {
                books: arrayUnion(item),
                date: arrayUnion(new Date()),
            });
        }
    };

    return (
        <div className="flex-col">
            <div className="mr-4 w-full flex-center">
                <input type="text" placeholder="Search" onChange={handleSearch} className=" border border-gray-300 rounded py-2 px-4" width={500} />
            </div>
            <hr className="my-4" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredData.map((item) => (
                    <div key={item.id} className="p-4 bg-white shadow-md rounded">
                        <h3 className="text-xl font-bold">{item.book}</h3>
                        <p className="text-gray-600">{item.author}</p>
                        <button className="px-3 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => handleAddToCart(item.id)}>Add to Cart</button>
                        <button className="ml-2 px-3 py-2 mt-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={() => handleAddToWishlist(item.id)}>Add to Wishlist</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;