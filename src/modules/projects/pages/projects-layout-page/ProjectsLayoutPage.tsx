import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {Project} from "../../models/project/project";
import {setProjects} from "../../../../store/projects/projects.slice";
import {useHttpClient} from "../../../../hooks/use-http-client/use-http-client";
import {useDispatch} from "react-redux";


export function ProjectsLayoutPage() {
    const httpClient = useHttpClient();
    const dispatch = useDispatch();

    useEffect(() => {
        getProjects();
    }, []);

    function getProjects() {
        httpClient.get("projects")
            .then((projects: Project[]) => dispatch(setProjects(projects)))
    }

    return (
        <Outlet></Outlet>
    )
}