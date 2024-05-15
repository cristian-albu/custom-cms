import Modal from "./components/modal";
import NewTableForm from "./components/new-table-form";

const App = () => {
    return (
        <div>
            <Modal title={"New table"} target={{ children: "New table" }}>
                <div
                    className="flex flex-col gap-5 w-full items-start"
                    onSubmit={(e) => console.log(e)}
                >
                    <NewTableForm />
                </div>
            </Modal>
        </div>
    );
};

export default App;
