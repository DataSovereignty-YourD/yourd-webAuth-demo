import DropDown2 from "../../components/dropDown2";
import { MdLabelOutline } from 'react-icons/md';
import { CiUser } from 'react-icons/ci';
import { BiDetail } from 'react-icons/bi';
export default function ExplainDropDown() {
    return(
        <>
        <DropDown2
            title={
              <div className="flex items-center gap-2">
                <MdLabelOutline size={24} />{' '}
                <span className="font-bold">characteristic</span>
              </div>
            }
          >
            <div className=""></div>
          </DropDown2>
          <DropDown2
            title={
              <div className="flex items-center gap-2">
                <CiUser size={24} />{' '}
                <span className="font-bold">Details</span>
              </div>
            }
          >
            <div className=""></div>
          </DropDown2>
          <DropDown2
            title={
              <div className="flex items-center gap-2">
                <BiDetail size={24} />{' '}
                <span className="font-bold">item activity</span>
              </div>
            }
          >
            <div className=""></div>
          </DropDown2></>
    );
}