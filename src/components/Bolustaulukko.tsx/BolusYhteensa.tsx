import { Table, TableHead, TableRow, TableCell, TableBody, Grid } from "@mui/material";
import React, { useContext } from "react";
import { Context, Laakeannos } from "../../context/context";

export const BolusYhteensa: React.FC = (): React.ReactElement => {
  const { bolus, bolusSumma, mlVrkSumma, laakeTaulukko } = useContext(Context);
  const kasetti50 = bolusSumma.reduce((prev: number, next: number) => {
    return prev + next;
  }, 0);

  return (
    <Grid item xs={12} md={2}>
      <Table sx={{ backgroundColor: "#cfffdd", boxShadow: 3 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#abffc1" }}>
            <TableCell>Max bol lkm/h huomioiden oletettu käyttöaika</TableCell>
            <TableCell align="center">riittävyys (50ml)</TableCell>
            <TableCell align="center">riittävyys (100ml)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>vrk</TableCell>
            <TableCell align="center">
              {laakeTaulukko?.filter((elem: Laakeannos) => elem.valmiste === "Natriumkloridi")
                .length > 0
                ? String(
                    (
                      (kasetti50 +
                        Number(
                          (laakeTaulukko?.filter(
                            (elem: Laakeannos) => elem.valmiste === "Natriumkloridi"
                          )[0].mgVrk /
                            mlVrkSumma) *
                            50
                        )) /
                      (mlVrkSumma + bolus.ml * bolus.maxH * 24)
                    ).toFixed(2)
                  ).replace(".", ",")
                : String(
                    (kasetti50 / (mlVrkSumma + bolus.ml * bolus.maxH * 24)).toFixed(2)
                  ).replace(".", ",")}
            </TableCell>
            <TableCell align="center">
              {laakeTaulukko?.filter((elem: Laakeannos) => elem.valmiste === "Natriumkloridi")
                .length > 0
                ? (
                    ((kasetti50 +
                      Number(
                        (laakeTaulukko?.filter(
                          (elem: Laakeannos) => elem.valmiste === "Natriumkloridi"
                        )[0].mgVrk /
                          mlVrkSumma) *
                          50
                      )) /
                      (mlVrkSumma + bolus.ml * bolus.maxH * 24)) *
                    2
                  ).toFixed(2)
                : String(
                    ((kasetti50 / (mlVrkSumma + bolus.ml * bolus.maxH * 24)) * 2).toFixed(2)
                  ).replace(".", ",")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left">h</TableCell>
            <TableCell align="center">
              {laakeTaulukko?.filter((elem: Laakeannos) => elem.valmiste === "Natriumkloridi")
                .length > 0
                ? (
                    ((kasetti50 +
                      Number(
                        (laakeTaulukko?.filter(
                          (elem: Laakeannos) => elem.valmiste === "Natriumkloridi"
                        )[0].mgVrk /
                          mlVrkSumma) *
                          50
                      )) /
                      (mlVrkSumma + bolus.ml * bolus.maxH * 24)) *
                    24
                  ).toFixed(2)
                : String(
                    ((kasetti50 / (mlVrkSumma + bolus.ml * bolus.maxH * 24)) * 24).toFixed(2)
                  ).replace(".", ",")}
            </TableCell>
            <TableCell align="center">
              {laakeTaulukko?.filter((elem: Laakeannos) => elem.valmiste === "Natriumkloridi")
                .length > 0
                ? String(
                    (
                      ((kasetti50 +
                        Number(
                          (laakeTaulukko?.filter(
                            (elem: Laakeannos) => elem.valmiste === "Natriumkloridi"
                          )[0]?.mgVrk /
                            mlVrkSumma) *
                            50
                        )) /
                        (mlVrkSumma + bolus.ml * bolus.maxH * 24)) *
                      24 *
                      2
                    ).toFixed(2)
                  ).replace(".", ",")
                : String(
                    ((kasetti50 / (mlVrkSumma + bolus.ml * bolus.maxH * 24)) * 24 * 2).toFixed(2)
                  ).replace(".", ",")}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Grid>
  );
};
