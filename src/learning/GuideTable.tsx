import { useId } from "react";
import { typeset } from "../domain/typeset";
import type { GuideSection } from "./guides/types";

export function GuideTable({
  title,
  table,
  idPrefix,
}: {
  title: string;
  table: NonNullable<GuideSection["table"]>;
  idPrefix?: string;
}) {
  const localId = useId();
  const prefix = idPrefix ?? localId;
  return (
    <div className="guide-table" role="region" tabIndex={0} aria-label={`${typeset(title)} tablosu`}>
      <table role="table">
        <thead role="rowgroup">
          <tr role="row">
            {table.headers.map((header, index) => (
              <th scope="col" role="columnheader" id={`${prefix}-col-${index}`} key={index}>
                {typeset(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {table.rows.map((row, rowIndex) => (
            <tr role="row" key={rowIndex}>
              {row.map((cell, index) => (
                <td role="cell" headers={`${prefix}-col-${index}`} key={index}>
                  <span className="guide-table-cell-label" aria-hidden="true">{typeset(table.headers[index])}</span>
                  <span className="guide-table-cell-value">{typeset(cell)}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
