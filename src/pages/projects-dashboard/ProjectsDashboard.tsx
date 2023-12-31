import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectProjects, setProjects} from "../../store/projects/projects.slice";
import {ProjectTile} from "../../components/project-tile/ProjectTile";
import {Project} from "../../models/project/project";

export function ProjectsDashboard() {
    const dispatch = useDispatch();
    const projects = useSelector(selectProjects);

    useEffect(() => {
        getProjects();
    }, []);

    function getProjects() {
        fetch("http://localhost:8000/projects")
            .then((res) => res.json())
            .then((projects: Project[]) => dispatch(setProjects(projects)))
    }

    return (
        <div>
            project dashboard
            <div style={{ display: "flex", flexWrap:"wrap", justifyContent:"space-evenly"}}>
                {projects.map((p) => (
                <ProjectTile project={p}  key={p.id}></ProjectTile>
            ))}
            </div>
        </div>
    )
}