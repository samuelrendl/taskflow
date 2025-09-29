import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { CreateDialogProps, Team } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { createTeam } from "@/lib/api";
import { useState } from "react";

const CreateTeamDialog = ({
  organizationId,
  setStep,
}: CreateDialogProps<Team>) => {
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!teamName.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await createTeam(teamName, organizationId!);
      setStep("final", response);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to create team. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>Create a Team</DialogTitle>
        <DialogDescription>Enter name for your new team.</DialogDescription>
      </DialogHeader>
      <Input
        type="text"
        placeholder="Team name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-between">
        <DialogClose asChild>
          <Button variant="outline" onClick={() => setStep("initial")}>
            Close
          </Button>
        </DialogClose>
        <Button
          variant="outline"
          onClick={handleSubmit}
          disabled={loading || !teamName.trim()}
        >
          Create
        </Button>
      </div>
    </>
  );
};

export default CreateTeamDialog;
