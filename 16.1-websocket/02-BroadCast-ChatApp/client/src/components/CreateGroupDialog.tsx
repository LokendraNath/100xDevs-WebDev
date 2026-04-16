import axios from "axios";
import { useState } from "react";

interface CreateGroupDialogProps {
  setClose: () => void;
}

const CreateGroupDialog = ({ setClose }: CreateGroupDialogProps) => {
  const [groupId, setGroupId] = useState<string | "">("");
  const [groupName, setGroupName] = useState<string | "">("");

  async function handleCreateGroup() {
    if (!groupId && !groupName)
      return alert("groupid or group name is invalid");

    try {
      const response = await axios.post("http://localhost:3030/createGroup", {
        groupId,
        groupName,
      });
      console.log("Group Created", response.data);
      return response.data;
    } catch (error) {
      console.error("Server Error", error);
    }
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h1>Create Group</h1>
        <input
          type="number"
          placeholder="Enter Group Id"
          onChange={(e) => setGroupId(e.target.value)}
          value={groupId}
          className="border"
        />
        <input
          type="text"
          placeholder="Enter Group Name"
          onChange={(e) => setGroupName(e.target.value)}
          value={groupName}
          className="border"
        />
        <button
          onClick={() => setClose()}
          className="border p-2 bg-red-500 text-white"
        >
          close
        </button>
        <button
          onClick={() => handleCreateGroup()}
          className="border p-2 bg-green-500 text-white"
          disabled={groupId.length <= 0}
        >
          Create
        </button>
      </div>
    </div>
  );
};
export default CreateGroupDialog;
