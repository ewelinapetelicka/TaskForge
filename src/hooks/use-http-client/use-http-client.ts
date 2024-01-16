import {useDispatch, useSelector} from "react-redux";
import {logoutUser, selectToken} from "../../store/user/user.slice";

export function useHttpClient() {
    const token = useSelector(selectToken);
    const dispatch = useDispatch();

    async function handleResponse(res: Response) {
        const data = await res.json();

        if (res.ok) {
            return data;
        }
        if (res.status === 401) {
            dispatch(logoutUser());
        }
        throw new Error(data);
    }

    return {
        get: (endpoint: string) => {
            return fetch('http://localhost:8000/' + endpoint, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((res) => handleResponse(res))
        },
        post: (endpoint: string, body: any) => {
            return fetch('http://localhost:8000/' + endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(body)
            }).then((res) => handleResponse(res))
        },
        patch:(endpoint:string, body:any) =>{
            return fetch('http://localhost:8000/'+ endpoint,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(body)
            }).then((res) => handleResponse(res))
    }
}}