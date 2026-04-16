import { useState } from "react";

interface JoinGroupDialogProps {
  setClose: () => void;
}

const JoinGroupDialog = ({ setClose }: JoinGroupDialogProps) => {
  const [groupId, setGroupId] = useState("");
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h1>Join the group</h1>
        <input
          type="text"
          onChange={(e) => setGroupId(e.target.value)}
          className="border"
        />
        <button
          onClick={() => setClose()}
          className="border p-2 bg-red-500 text-white"
        >
          close
        </button>
        <button
          onClick={() => setClose()}
          className="border p-2 bg-green-500 text-white"
          disabled={groupId.length <= 0}
        >
          Join
        </button>
      </div>
    </div>
  );
};
export default JoinGroupDialog;
