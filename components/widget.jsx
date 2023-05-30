import { AiOutlineUser } from "react-icons/ai";
import { TbBooks } from "react-icons/tb";
import { MdKeyboardArrowUp,MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";

const Widget = ( {type} ) => {
    let data;

    const amount=100;
    const diff=100;

    switch (type) {
        case "user":
            data = {
                title: "USERS",
                link: (<Link href='/admin/users' className="hover:text-blue-500">See all users</Link>),
                icon: (
                    <AiOutlineUser className="icon" size={40} />
                ),
            };
            break;
            case "books":
                data = {
                    title: "BOOKS",
                    link: (<Link href='/admin/books' className="hover:text-blue-500">See all books</Link>),
                    icon: (
                        <TbBooks className="icon" size={40} />
                    ),
                };
                break;
            default:
                break;
    }

  return (
    <div className="widget">
        <div className="left">
            <span className="title"> {data.title} </span>
            <span className="link"> {data.link} </span>
        </div>
    </div>
  );
};

export default Widget;