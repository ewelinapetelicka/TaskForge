import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {Project} from "./models/project/project";
import {selectLoadedProjects, setProjects} from "../../store/projects/projects.slice";
import {useHttpClient} from "../../hooks/use-http-client/use-http-client";
import {useDispatch, useSelector} from "react-redux";


export function ProjectListLayout() {
    const httpClient = useHttpClient();
    const dispatch = useDispatch();
    const loadedProjects = useSelector(selectLoadedProjects);

    useEffect(() => {
        getProjects();
    }, []);

    function getProjects() {
        httpClient.get("projects")
            .then((projects: Project[]) => dispatch(setProjects(projects)))
    }

    if (!loadedProjects) {
        return null;
    }

    return (
        <Outlet></Outlet>
    )
}