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
                  sx={ohje.sivu === 5 ? { border: "5px solid blue" } : {}}
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
                      sx={{ width: "100%" }}
                    />
                  ) : (
                    <Typography>{laake.laVahvuus}</Typography>
                  )}
                </TableCell>

                <TableCell align="center" sx={ohje.sivu === 1 ? { border: "5px solid blue" } : {}}>
                  {laake.valmiste === "Natriumkloridi" ? (
                    <></>
                  ) : (
                    <TextField
                      sx={{ backgroundColor: "orange", width: "150%" }}
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
                      ? { border: "5px solid blue" }
                      : ohje.sivu === 3 && laake.valmiste === "Natriumkloridi"
                      ? { border: "5px solid blue" }
                      : {}
                  }
                >
                  <b>
                    {laake.valmiste === "Natriumkloridi" ? (
                      <TextField
                        sx={{ backgroundColor: "orange", width: "150%" }}
                        defaultValue={laake.mgVrk}
                        onChange={(e) => {
                          laakeTaulukko[idx].mgVrk = e.target.value;
                          setLaakeTaulukko([...laakeTaulukko]);
                        }}
                      />
                    ) : mlVrk === 0 ? (
                      <></>
                    ) : (
                      (Math.round(mlVrk * 100) / 100).toFixed(2)
                    )}
                  </b>
                </TableCell>
                <TableCell align="center">
                  {mgH === 0 ? <></> : (Math.round(mgH * 100) / 100).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  {pitMgMl === 0 ? <></> : (Math.round(pitMgMl * 100) / 100).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  {laake.valmiste === "Natriumkloridi" && nacl50 ? (
                    nacl50.toFixed(1)
                  ) : kasetti50 === 0 ? (
                    <></>
                  ) : (
                    kasetti50.toFixed(1)
                  )}
                </TableCell>
                <TableCell align="center">
                  {laake.valmiste === "Natriumkloridi" && nacl100 ? (
                    nacl100.toFixed(1)
                  ) : kasetti100 === 0 ? (
                    <></>
                  ) : (
                    kasetti100.toFixed(1)
                  )}
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
                  onChange={(e) =>
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
            <TableCell sx={{ width: "90%" }}>
              <Valinta />
            </TableCell>
          )}
        </TableRow>
        <TableRow>
          <TableCell padding="none" />
          <TableCell padding="none" />
          <TableCell padding="none">
            <Typography fontSize={"12px"} sx={{ paddingLeft: "2" }}>
              Infuusionopeus
            </Typography>
          </TableCell>
          <TableCell
            sx={
              ohje.sivu === 2
                ? { border: "5px solid blue", backgroundColor: "yellow" }
                : { backgroundColor: "yellow" }
            }
            align="center"
          >
            {mlVrkSumma.toFixed(2)} ml/vrk
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell padding="none" />
          <TableCell padding="none" />
          <TableCell padding="none">
            <Typography fontSize={"12px"}>Infuusionopeus</Typography>
          </TableCell>
          <TableCell
            sx={
              ohje.sivu === 2
                ? { border: "5px solid blue", backgroundColor: "yellow" }
                : { backgroundColor: "yellow" }
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
