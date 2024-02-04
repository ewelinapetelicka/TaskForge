import {TabPanel, TabView} from "primereact/tabview";
import {SettingsGeneral} from "../../components/settings-general/SettingsGeneral";

export function ProjectSettingsPage() {
    return (
        <div className={"pt-3"}>
            <TabView>
                <TabPanel header="General settings">
                    <SettingsGeneral></SettingsGeneral>
                </TabPanel>
                <TabPanel header="Account settings">
                </TabPanel>
                <TabPanel header="Security settings">
                </TabPanel>
                <TabPanel header="Project removal">
                </TabPanel>
            </TabView>
        </div>
    )
}