import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Typography,
  IconButton
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { Context, Laakeannos } from "../../context/context";
import { Valinta } from "../Valinta";
import TaulukkoDialog from "./Taulukko-dialog";

interface Props {
  vahvuusMuok: any;
  setVahvuusMuok: Dispatch<SetStateAction<any>>;
  poisto: (indeksi: number) => void;
}

const TaulukkoNakyma = (props: Props): React.ReactElement => {
  const { vahvuusMuok, setVahvuusMuok, poisto } = props;

  const { laakeTaulukko, mlVrkSumma, ohje, setLaakeTaulukko, muokkausTila, setMuokkaustila } =
    useContext(Context);

  return (
    <Table sx={{ backgroundColor: "#cfffdd" }}>
      <TaulukkoDialog vahvuusMuok={vahvuusMuok} setVahvuusMuok={setVahvuusMuok} />

      <TableHead>
        <TableRow>
          <TableCell sx={{ backgroundColor: "#259443" }}>Valmiste</TableCell>
          <TableCell sx={{ backgroundColor: "#259443" }} align="center">
            LA-Vahvuus (mg/ml)
          </TableCell>
          <TableCell sx={{ backgroundColor: "#259443" }} align="center">
            mg/vrk
          </TableCell>
          <TableCell sx={{ backgroundColor: "#259443" }} align="center">
            ml/vrk
          </TableCell>
          <TableCell sx={{ backgroundColor: "#259443" }} align="center">
            mg/h
          </TableCell>
          <TableCell sx={{ backgroundColor: "#259443" }} align="center">
            pit mg/ml
          </TableCell>
          <TableCell sx={{ backgroundColor: "lightgreen", fontSize: "12px" }} align="center">
            lääke-{<br />}annostelija ml 50
          </TableCell>
          <TableCell sx={{ backgroundColor: "lightgreen", fontSize: "12px" }} align="center">
            lääke-{<br />}annostelija ml 100
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {laakeTaulukko?.map((laake: Laakeannos, idx: number) => {
          const nacl = laakeTaulukko?.filter(
            (elem: Laakeannos) => elem.valmiste === "Natriumkloridi"
          )[0];

          const mlVrk = laake.mgVrk / laake.laVahvuus;
          const mgH = (mlVrk / 24) * laake.laVahvuus;
          const pitMgMl = (mlVrk / mlVrkSumma) * laake.laVahvuus;
          const kasetti50 = (mlVrk / mlVrkSumma) * 50;
          const kasetti100 = (mlVrk / mlVrkSumma) * 100;

          let nacl50 = 0;
          let nacl100 = 0;

          if (
            laakeTaulukko?.filter((elem: Laakeannos) => elem.valmiste === "Natriumkloridi").length >
            0
          ) {
            nacl50 = (nacl?.mgVrk / mlVrkSumma) * 50;
            nacl100 = (nacl?.mgVrk / mlVrkSumma) * 100;
          }

          return (
            <>
              <TableRow>
                <TableCell>
                  <IconButton onClick={() => poisto(idx)}>
                    <ClearIcon />
                  </IconButton>
                  <Typography sx={{ display: "inline-block" }}>{laake.valmiste}</Typography>
                </TableCell>

                <TableCell
                  sx={ohje.sivu === 5 ? { boxShadow: "inset -1px 0px 10px 2px blue" } : {}}
                  onDoubleClick={() =>
                    setVahvuusMuok({
                      ...vahvuusMuok,
                      paalla: true,
                      arvo: idx,
                      nimi: laake.valmiste
                    })
                  }
                  align="center"
                >
                  {vahvuusMuok.paalla && vahvuusMuok.arvo === idx ? (
                    <TextField
                      onBlur={(e) =>
                        setVahvuusMuok({ ...vahvuusMuok, dialog: true, muutos: e.target.value })
                      }
                      defaultValue={laake.laVahvuus}
                      sx={{ width: "70%" }}
                    />
                  ) : (
                    <Typography>{laake.laVahvuus}</Typography>
                  )}
                </TableCell>

                <TableCell
                  align="center"
                  sx={ohje.sivu === 1 ? { boxShadow: "inset -1px 0px 10px 2px blue" } : {}}
                >
                  {laake.valmiste === "Natriumkloridi" ? null : (
                    <TextField
                      sx={{ backgroundColor: "orange", width: "70%" }}
                      defaultValue={laake.mgVrk}
                      onChange={(e) => {
                        laakeTaulukko[idx].mgVrk = e.target.value;
                        setLaakeTaulukko([...laakeTaulukko]);
                      }}
                    />
                  )}
                </TableCell>

                <TableCell
                  align="center"
                  sx={
                    ohje.sivu === 1
                      ? { boxShadow: "inset -1px 0px 10px 2px blue" }
                      : ohje.sivu === 3 && laake.valmiste === "Natriumkloridi"
                      ? { boxShadow: "inset -1px 0px 10px 2px blue" }
                      : {}
                  }
                >
                  <b>
                    {laake.valmiste === "Natriumkloridi" ? (
                      <TextField
                        sx={{ backgroundColor: "orange", width: "70%" }}
                        defaultValue={laake.mgVrk}
                        onChange={(e) => {
                          laakeTaulukko[idx].mgVrk = e.target.value;
                          setLaakeTaulukko([...laakeTaulukko]);
                        }}
                      />
                    ) : mlVrk === 0 ? null : (
                      String((Math.round(mlVrk * 100) / 100).toFixed(2)).replace(".", ",")
                    )}
                  </b>
                </TableCell>
                <TableCell align="center">
                  {mgH === 0
                    ? null
                    : String((Math.round(mgH * 100) / 100).toFixed(2)).replace(".", ",")}
                </TableCell>
                <TableCell align="center">
                  {pitMgMl === 0
                    ? null
                    : String((Math.round(pitMgMl * 100) / 100).toFixed(2)).replace(".", ",")}
                </TableCell>
                <TableCell align="center">
                  {laake.valmiste === "Natriumkloridi" && nacl50
                    ? String(nacl50.toFixed(1)).replace(".", ",")
                    : kasetti50 === 0
                    ? null
                    : String(kasetti50.toFixed(1)).replace(".", ",")}
                </TableCell>
                <TableCell align="center">
                  {laake.valmiste === "Natriumkloridi" && nacl100
                    ? String(nacl100.toFixed(1)).replace(".", ",")
                    : kasetti100 === 0
                    ? null
                    : String(kasetti100.toFixed(1)).replace(".", ",")}
                </TableCell>
              </TableRow>
            </>
          );
        })}
        <TableRow>
          {muokkausTila.paalla ? (
            <>
              <TableCell>
                <TextField
                  type={"text"}
                  onBlur={(e) =>
                    setMuokkaustila({
                      ...muokkausTila,
                      tiedot: { ...muokkausTila.tiedot, valmiste: e.target.value }
                    })
                  }
                  sx={{ backgroundColor: "orange" }}
                />
              </TableCell>

              <TableCell>
                <TextField
                  type={"number"}
                  onBlur={(e) =>
                    setMuokkaustila({
                      ...muokkausTila,
                      tiedot: { ...muokkausTila.tiedot, laVahvuus: Number(e.target.value) }
                    })
                  }
                  sx={{ backgroundColor: "orange" }}
                />
              </TableCell>

              <TableCell>
                <TextField
                  type={"number"}
                  onBlur={(e) =>
                    setMuokkaustila({
                      ...muokkausTila,
                      tiedot: { ...muokkausTila.tiedot, mgVrk: Number(e.target.value) }
                    })
                  }
                  sx={{ backgroundColor: "orange" }}
                />
              </TableCell>
            </>
          ) : (
            <TableCell sx={{ width: "70%" }}>
              <Valinta />
            </TableCell>
          )}
        </TableRow>
        <TableRow>
          <TableCell padding="none" />
          <TableCell padding="none" />
          <TableCell padding="none">
            <Typography fontSize={"14px"}>Infuusionopeus</Typography>
          </TableCell>
          <TableCell
            sx={
              ohje.sivu === 2
                ? { boxShadow: "inset -1px 0px 10px 2px blue", backgroundColor: "yellow" }
                : { backgroundColor: "yellow", border: "1px solid orange" }
            }
            align="center"
          >
            {String(mlVrkSumma.toFixed(2)).replace(".", ",")} ml/vrk
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="none" />
          <TableCell padding="none" />
          <TableCell padding="none">
            <Typography fontSize={"14px"}>Infuusionopeus</Typography>
          </TableCell>
          <TableCell
            sx={
              ohje.sivu === 2
                ? { boxShadow: "inset -1px 0px 10px 2px blue", backgroundColor: "yellow" }
                : { backgroundColor: "yellow", border: "1px solid orange" }
            }
            align="center"
          >
            {(mlVrkSumma / 24).toFixed(2)} ml/h
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TaulukkoNakyma;
