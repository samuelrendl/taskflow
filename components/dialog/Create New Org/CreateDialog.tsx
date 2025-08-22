import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { CreateDialogProps } from "@/lib/types";
import { Input } from "../../ui/input";
import { useState } from "react";
import { createOrganization } from "@/lib/api";

const CreateDialog = ({ ownerId, setStep }: CreateDialogProps) => {
  const [orgName, setOrgName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!orgName.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await createOrganization(orgName, ownerId);
      setStep("final", response);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to create organization. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create an Organization</DialogTitle>
        <DialogDescription>
          Enter name for your new organization.
        </DialogDescription>
      </DialogHeader>
      <Input
        type="text"
        placeholder="Organization name"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <Button variant="outline" onClick={() => setStep("initial")}>
          Back
        </Button>
        <Button
          variant="outline"
          onClick={handleSubmit}
          disabled={loading || !orgName.trim()}
        >
          Create
        </Button>
      </div>
    </>
  );
};

export default CreateDialog;
