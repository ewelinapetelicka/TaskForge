import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectProjects, setProjects} from "../../store/projects/projects.slice";
import {ProjectTile} from "../../components/project-tile/ProjectTile";
import {Project} from "../../models/project/project";
import {useHttpClient} from "../../hooks/use-http-client/use-http-client";

export function ProjectsDashboard() {
    const dispatch = useDispatch();
    const projects = useSelector(selectProjects);
    const httpClient = useHttpClient();

    useEffect(() => {
        getProjects();
    }, []);

    function getProjects() {
       httpClient.get("projects")
            .then((projects: Project[]) => dispatch(setProjects(projects)))
    }

    return (
        <div>
            project dashboard
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-evenly"}}>
                {projects.map((p) => (
                    <ProjectTile project={p} key={p.id}></ProjectTile>
                ))}
            </div>
        </div>
    )
}