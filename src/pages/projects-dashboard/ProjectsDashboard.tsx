import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectProjects, setProjects} from "../../store/projects/projects.slice";

export function ProjectsDashboard() {
    const dispatch = useDispatch();
    const projects = useSelector(selectProjects);

    useEffect(() => {
        getProjects();
    }, []);

    function getProjects() {
        fetch("http://localhost:8000/projects")
            .then((res) => res.json())
            .then((projects) => dispatch(setProjects({projects})))
    }

    return (
        <div>
            project dashboard
            {projects.map(p => (
                <>
                    {p.title}
                </>
            ))}
        </div>
    )
}