import {Outlet, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {ListBox} from "primereact/listbox";

export function ProjectLayoutPage() {
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const index = menuOptions.find(option => location.pathname.includes(option.path))!.index;
        setSelectedIndex(index);
    }, []);



        useEffect(() => {
        if(selectedIndex !== -1){
            navigate(menuOptions[selectedIndex].path);
        }
    }, [selectedIndex]);

    const menuOptions = [
        {name: 'Backlog', path: 'backlog', index: 0},
        {name: 'Task browser', path: 'browser', index: 1},
        {name: 'Settings', path: 'settings', index: 2}
    ];

    return (
        <div className="w-full h-full flex">
            <div className={"w-4 h-full"}>
                <ListBox value={selectedIndex}
                         onChange={(e) => setSelectedIndex(e.value)}
                         options={menuOptions}
                         optionLabel="name"
                         optionValue="index"
                         className="w-full md:w-14rem"/>
            </div>
            <div className={"w-8 h-full justify-content-center"}>
                <Outlet></Outlet>
            </div>
        </div>
    )
}