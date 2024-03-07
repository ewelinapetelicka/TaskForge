import {useHttpClient} from "../../hooks/use-http-client/use-http-client";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Project} from "../project-list/models/project/project";
import {Outlet} from "react-router-dom";
import {
    selectProfileLoadedProjects,
    selectProfileLoadedSprints,
    selectProfileLoadedTasks,
    selectProfileProjects,
    setProfileProjects,
    setProfileSprints,
    setProfileTasks
} from "../../store/profile/profile.slice";
import {selectUser} from "../../store/user/user.slice";
import {Sprint} from "../project-details/models/sprint/sprint";
import {Task} from "../project-details/models/task/task";

export function ProfileLayout() {
    const httpClient = useHttpClient();
    const dispatch = useDispatch();
    const profileProjects = useSelector(selectProfileProjects);
    const loadedProjects = useSelector(selectProfileLoadedProjects);
    const loadedTasks = useSelector(selectProfileLoadedTasks);
    const loadedSprints = useSelector(selectProfileLoadedSprints);
    const user = useSelector(selectUser);

    useEffect(() => {
        getProjects();
        getTasks();
    }, []);

    useEffect(() => {
        if (loadedProjects) {
            getSprints();
        }
    }, [loadedProjects]);

    function getProjects() {
        httpClient.get("projects")
            .then((projects: Project[]) => dispatch(setProfileProjects(projects.filter((el) => el.userIds.includes(user.id)))));
    }

    function getSprints() {
        httpClient.get("sprints")
            .then((sprints: Sprint[]) => dispatch(setProfileSprints(sprints.filter((el) => profileProjects.find((e) => e.id === el.projectId)))));
    }

    function getTasks() {
        httpClient.get("tasks")
            .then((tasks: Task[]) => dispatch(setProfileTasks(tasks.filter((el) => el.userIds?.includes((user.id))))));
    }

    if (!loadedProjects || !loadedTasks || !loadedSprints) {
        return null;
    }

    return (
        <Outlet></Outlet>
    )
}