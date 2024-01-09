import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectProjects} from "../../../../store/projects/projects.slice";
import {ProjectTile} from "../../components/project-tile/ProjectTile";
import {Project} from "../../models/project/project";
import {InputText} from "primereact/inputtext";

export function ProjectsDashboardPage() {
    const projects = useSelector(selectProjects);
    const [search, setSearch] = useState<string>("");
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([])

    useEffect(() => {
        setFilteredProjects(projects.filter((el) => el.title.toLowerCase().includes(search.toLowerCase())));
    }, [search, projects]);

    return (
        <div className="w-full h-full">
            <div className="w-full flex justify-content-end p-2 pr-6">
                <span className="p-input-icon-left" >
                    <i className="pi pi-search"/>
                    <InputText placeholder="Search" onChange={(e) => setSearch(e.target.value)}/>
                </span>
            </div>
            <div className="flex flex-wrap justify-content-evenly ">
                {filteredProjects.map((p) => (
                    <ProjectTile project={p} key={p.id}></ProjectTile>
                ))}
            </div>
        </div>
    )
}