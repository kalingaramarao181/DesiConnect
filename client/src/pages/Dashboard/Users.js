import React from "react";
import { userData } from "./demoData";

export default function Users() {
  return (
    <div style={{ padding: "30px" }}>
      <h2>Users</h2>

      <table className="dc-table">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
        </tr>

        {userData.map(u => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.status}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
