import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectProjects, setProjects} from "../../store/projects/projects.slice";
import {ProjectTile} from "../../components/project-tile/ProjectTile";
import {Project} from "../../models/project/project";
import {useHttpClient} from "../../hooks/use-http-client/use-http-client";
import {Input, InputAdornment} from "@mui/material";
import {Search} from "@mui/icons-material";

export function ProjectsDashboardPage() {
    const dispatch = useDispatch();
    const projects = useSelector(selectProjects);
    const httpClient = useHttpClient();
    const [search, setSearch] = useState<string>("");
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([])

    useEffect(() => {
        getProjects();
    }, []);

    useEffect(() => {
        setFilteredProjects(projects.filter((el) => el.title.toLowerCase().includes(search.toLowerCase())));
    }, [search, projects]);

    function getProjects() {
        httpClient.get("projects")
            .then((projects: Project[]) => dispatch(setProjects(projects)))
    }

    return (
        <div style={{width: '100%', height: '100%'}}>
            <div style={{width: '100%', display: 'flex', justifyContent: 'end', padding: '1rem', paddingRight: '5rem'}}>
                <Input
                    id="input-with-icon-adornment"
                    onChange={(e) => setSearch(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <Search/>
                        </InputAdornment>
                    }
                />
            </div>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-evenly"}}>
                {filteredProjects.map((p) => (
                    <ProjectTile project={p} key={p.id}></ProjectTile>
                ))}
            </div>
        </div>
    )
}