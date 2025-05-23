import {useLocation, useNavigate} from "react-router-dom";
import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser, selectProfileAvatar} from "../../store/user/user.slice";
import {Avatar} from "primereact/avatar";
import {Button} from "primereact/button";
import {MegaMenu} from "primereact/megamenu";
import {Menu} from "primereact/menu";

export function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const avatar = useSelector(selectProfileAvatar);
    const menuRight = useRef<Menu>(null);
    const location = useLocation();

    const menuItems = [{
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        command: () => navigate('/profile')
    }, {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => dispatch(logoutUser())
    }]

    return (
        <MegaMenu orientation="horizontal"
                  start={(
                      <div onClick={() => navigate("/projects/dashboard")}
                           className="flex align-items-center gap-3 cursor-pointer select-none">
                          <i className="pi pi-box"
                             style={{fontSize: '30px', color: 'var(--primary-color)', rotate: '180deg'}}></i>
                          <h2>TaskForge</h2>
                      </div>
                  )
                  }
                  end={(
                      <>
                          <Menu model={menuItems} popup ref={menuRight} popupAlignment="right"/>
                          <Button onClick={(event) => menuRight.current!.toggle(event)}
                                  className="p-0 border-0 border-circle">
                              <Avatar image={avatar} size="large"/>
                          </Button>
                      </>
                  )}>
        </MegaMenu>
    )
}