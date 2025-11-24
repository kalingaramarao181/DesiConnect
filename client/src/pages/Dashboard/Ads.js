import React from "react";
import { adsData } from "./demoData";

export default function Ads() {
  return (
    <div style={{ padding: "30px" }}>
      <h2>Ads Management</h2>

      <table className="dc-table">
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Status</th>
        </tr>

        {adsData.map(ad => (
          <tr key={ad.id}>
            <td>{ad.title}</td>
            <td>{ad.category}</td>
            <td>{ad.status}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
