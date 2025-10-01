import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";

const CreateNewTaskDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        \<Button>Create new task</Button>
      </DialogTrigger>
      <DialogContent></DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Task</DialogTitle>
      </DialogHeader>
      <div>
        <div>
          <p>assign to</p>
          <p>priority</p>
        </div>
        <div>
            textarea
        </div>
      </div>
    </Dialog>
  );
};

export default CreateNewTaskDialog;
