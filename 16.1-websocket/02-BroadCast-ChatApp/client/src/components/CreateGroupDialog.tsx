import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CreateGroupDialogProps {
  setGroups: () => void;
  setClose: () => void;
}

const CreateGroupDialog = ({ setClose, setGroups }: CreateGroupDialogProps) => {
  const [groupName, setGroupName] = useState<string | "">("");
  const navigate = useNavigate();

  async function handleCreateGroup() {
    if (!groupName) return alert("groupid or group name is invalid");

    try {
      const response = await axios.post("http://localhost:3030/createGroup", {
        groupName,
      });

      let groupId = response.data.groupId;

      //@ts-ignore
      // setGroups((prev) => [...prev, newGroup]);2
      navigate(`/chat/${groupId}`);
    } catch (error) {
      console.error("Group Create Failed", error);
    }
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h1>Create Group</h1>
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
          disabled={groupName.length <= 0}
        >
          Create
        </button>
      </div>
    </div>
  );
};
export default CreateGroupDialog;
