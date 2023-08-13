import { BsArrowRightShort } from "react-icons/bs";

const List = ({ skill }) => {
  return (
    <li className="flex items-center" key={skill}>
      <BsArrowRightShort /> <span>{skill}</span>
    </li>
  );
};
export default List;
