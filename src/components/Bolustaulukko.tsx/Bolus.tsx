import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Typography
} from "@mui/material";
import React, { useContext } from "react";
import { Context, Laakeannos } from "../../context/context";

export const Bolus: React.FC = (): React.ReactElement => {
  const { ohje, laakeTaulukko, mlVrkSumma, bolus, setBolus } = useContext(Context);

  return (
    <TableContainer sx={{ width: "70%", border: "3px solid #259443", boxShadow: 3 }}>
      <Table sx={{ backgroundColor: "lightgray" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: "#259443" }}>Boluksien määritys</TableCell>
            <TableCell align="center" sx={{ backgroundColor: "#259443" }} />
            <TableCell align="center" sx={{ backgroundColor: "#259443" }} />
            <TableCell align="center" sx={{ backgroundColor: "#259443" }}>
              bolus ml
            </TableCell>
            <TableCell align="center" sx={{ backgroundColor: "#259443" }}>
              max bol lkm/h
            </TableCell>
            <TableCell align="center" sx={{ backgroundColor: "#259443" }}>
              lukko (min)
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell />
            <TableCell align="center" />
            <TableCell align="center" />
            <TableCell sx={ohje.sivu === 4 ? { border: "5px solid blue" } : {}} align="center">
              <TextField
                defaultValue={bolus.ml}
                onChange={(e) => setBolus({ ...bolus, ml: Number(e.target.value) })}
              />
            </TableCell>
            <TableCell sx={ohje.sivu === 4 ? { border: "5px solid blue" } : {}} align="center">
              <TextField
                defaultValue={bolus.maxH}
                onChange={(e) => setBolus({ ...bolus, maxH: Number(e.target.value) })}
              />
            </TableCell>
            <TableCell align="center">{(60 / bolus.maxH).toFixed(2)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell />
            <TableCell align="center">pitoisuus</TableCell>
            <TableCell align="center">mg/h</TableCell>
            <TableCell align="center">bolus mg</TableCell>
            <TableCell align="center">maxbol mg/h</TableCell>
            <TableCell align="center">max lisä mg/24h</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {laakeTaulukko
            ?.filter((elem: Laakeannos) => elem.valmiste !== "Natriumkloridi")
            .map((laake: Laakeannos) => {
              const mlVrk = laake.mgVrk / laake.laVahvuus;
              // let mgH = mlVrk / 24 * laake.laVahvuus;
              const pitMgMl = Number((mlVrk / mlVrkSumma) * laake.laVahvuus);
              // let kasetti50 = mlVrk / mlVrkSumma * 50;
              const pitoisuus = pitMgMl * (mlVrkSumma / 24);
              const bolusMg = pitMgMl * bolus.ml;
              const maxBolMgH = Number(bolusMg) * Number(bolus.maxH);
              const maxLisa = maxBolMgH * 24;

              return (
                <>
                  <TableRow>
                    <TableCell>
                      <Typography>{laake.valmiste}</Typography>
                    </TableCell>

                    <TableCell align="center">
                      {pitMgMl === 0 ? null : pitMgMl.toFixed(2)}
                    </TableCell>

                    <TableCell align="center">
                      {pitMgMl === 0 ? null : pitoisuus.toFixed(2)}
                    </TableCell>

                    <TableCell align="center">
                      <b>{bolusMg === 0 ? null : bolusMg.toFixed(2)}</b>
                    </TableCell>
                    <TableCell align="center">
                      {maxBolMgH === 0 ? null : maxBolMgH.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      {maxLisa === 0 ? null : maxLisa.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
