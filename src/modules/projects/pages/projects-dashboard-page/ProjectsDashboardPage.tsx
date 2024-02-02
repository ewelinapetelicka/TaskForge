import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {openDetailsProject, selectIsProjectDetailOpen, selectProjects} from "../../../../store/projects/projects.slice";
import {ProjectTile} from "../../components/project-tile/ProjectTile";
import {Project} from "../../models/project/project";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {ProjectDetailsModal} from "../../modals/project-details-modal/ProjectDetailsModal";

export function ProjectsDashboardPage() {
    const projects = useSelector(selectProjects);
    const [search, setSearch] = useState<string>("");
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const dispatch = useDispatch();
    const visible = useSelector(selectIsProjectDetailOpen);

    useEffect(() => {
        setFilteredProjects(projects.filter((el) => el.title.toLowerCase().includes(search.toLowerCase())));
    }, [search, projects]);

    function openProjectModal() {
        dispatch(openDetailsProject({
            id: null as any,
            title: "",
            description: "Add project description...",
            icon: "",
            userIds: []
        }))
    }

    return (
        <div className="w-full h-full">
            <div className="w-full flex justify-content-between p-2 pr-6">
                <Button label={"ADD NEW"} outlined onClick={() => openProjectModal()}>
                </Button>
                <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                    <InputText placeholder="Search" onChange={(e) => setSearch(e.target.value)}/>
                </span>
            </div>
            <div className="flex flex-wrap justify-content-evenly ">
                {filteredProjects.map((p) => (
                    <ProjectTile project={p} key={p.id}></ProjectTile>
                ))}
            </div>
            {visible && <ProjectDetailsModal></ProjectDetailsModal>}
        </div>
    )
}