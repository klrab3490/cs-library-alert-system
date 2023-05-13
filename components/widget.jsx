import { AiOutlineUser } from "react-icons/ai";
import { TbBooks } from "react-icons/tb";
import { MdKeyboardArrowUp,MdKeyboardArrowDown } from "react-icons/md";

const Widget = ( {type} ) => {
    let data;

    const amount=100;
    const diff=100;

    switch (type) {
        case "user":
            data = {
                title: "USERS",
                link: "See all users",
                icon: (
                    <AiOutlineUser className="icon" />
                ),
            };
            break;
            case "books":
                data = {
                    title: "BOOKS",
                    link: "See all books",
                    icon: (
                        <TbBooks className="icon" />
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
        <div className="right">
            <div className="percentage positive">
                <MdKeyboardArrowUp />
                {diff} %
            </div>
            {data.icon}
        </div>
    </div>
  );
};

export default Widget;