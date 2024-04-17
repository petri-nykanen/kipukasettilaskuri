import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, Typography, IconButton, DialogContentText, DialogActions, Dialog, DialogContent, Button } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context, Laakeannos } from '../context/context'
import { Valinta } from './Valinta';
import GenericDialog from './GenericDialog';

export const Taulukko: React.FC = (): React.ReactElement => {

  const { laakeTaulukko, mlVrkSumma, ohje, setLaakeTaulukko, muokkausTila, setMuokkaustila, setVaihtoehdot, vaihtoehdot, omaMlh, setOmaMlh, setMlVrkSumma, mlVrkMuisti, paivitaTaulukko } = useContext(Context)

  const [vahvuusMuok, setVahvuusMuok] = useState<any>({
    paalla: false,
    arvo: 0,
    dialog: false,
    nimi: "",
    muutos: 0,
    omaMlh: false,
    omaMlhValueVrk: 0,
    omaMlhValueH: 0,
    omaDialog: false
  })

  const vrkRef: React.MutableRefObject<string | undefined> = useRef();
  const hRef: React.MutableRefObject<string | undefined> = useRef();

  const omaMlhContent = () => {
    if (vahvuusMuok.omaMlh) return (
      <>
        <Button
          onClick={() => setVahvuusMuok({ ...vahvuusMuok, omaDialog: true })}
          variant={'outlined'}>Ok</Button>

        <Button
          onClick={() => setVahvuusMuok({ ...vahvuusMuok, omaMlh: false })}
          variant={'outlined'}>Peruuta</Button>
      </>
    )
    return (
      <Button
        variant={'contained'}
        onClick={() => { setVahvuusMuok({ ...vahvuusMuok, omaMlh: true }); }}
        sx={{ fontSize: "10px", backgroundColor: "orange", "&:hover": { backgroundColor: "darkorange" } }}>
        Aseta oma</Button>)
  }

  const mlhSet = () => {
    if (vrkRef.current) {
      setMlVrkSumma(Number(vahvuusMuok.omaMlhValueVrk)); setVahvuusMuok({ ...vahvuusMuok, omaMlh: false }); setOmaMlh(true)
    }
    else {
      setMlVrkSumma(Number(vahvuusMuok.omaMlhValueH)); setVahvuusMuok({ ...vahvuusMuok, omaMlh: false }); setOmaMlh(true)
    }
    setVahvuusMuok({ ...vahvuusMuok, omaDialog: false, omaMlh: false })
  }


  const omaMlhTaiFixedMlh = (aikavali: string) => {
    if (vahvuusMuok.omaMlh && aikavali === "vrk") return (
      <>
        <TextField
          value={vahvuusMuok.omaMlhValueVrk}
          inputRef={vrkRef}
          onChange={(e) => setVahvuusMuok({ ...vahvuusMuok, omaMlhValueVrk: e.target.value, omaMlhValueH: (Number(e.target.value) / 24).toFixed(2) })}
          type='tel'
          sx={{ backgroundColor: "white", mb: "5%" }}></TextField>
      </>
    )
    if (vahvuusMuok.omaMlh && aikavali !== "vrk") return (
      <>
        <TextField
          value={vahvuusMuok.omaMlhValueH}
          inputRef={hRef}
          onChange={(e) => setVahvuusMuok({ ...vahvuusMuok, omaMlhValueH: e.target.value, omaMlhValueVrk: (Number(e.target.value) * 24).toFixed(2) })}
          type='tel'
          sx={{ backgroundColor: "white", mb: "5%" }}></TextField>
      </>
    )

    if (!vahvuusMuok.omaMlh && aikavali === "vrk") {
      return (mlVrkSumma).toFixed(2)
    }
    else return (mlVrkSumma / 24).toFixed(2)
  }

  const poisto = (indeksi: number) => {
    setLaakeTaulukko(laakeTaulukko.filter((elementti: any) => { return elementti !== laakeTaulukko[indeksi] }))
    if (
      laakeTaulukko[indeksi].valmiste === "Morfiini"
      ||
      laakeTaulukko[indeksi].valmiste === "Oksikodoni"
      ||
      laakeTaulukko[indeksi].valmiste === "Hydromorfiini"
      ||
      laakeTaulukko[indeksi].valmiste === "Haloperidoli"
      ||
      laakeTaulukko[indeksi].valmiste === "Midatsolaami"
      ||
      laakeTaulukko[indeksi].valmiste === "Glykopyrroni"
      ||
      laakeTaulukko[indeksi].valmiste === "Natriumkloridi"
    )
      setVaihtoehdot([...vaihtoehdot, laakeTaulukko[indeksi]].sort((a: Laakeannos, b: Laakeannos) => {
        if (a.valmiste > b.valmiste)
          return 1
        else
          return -1
      }))
  }

  const renderOmaMlhVaroitus = () => {
    if (omaMlh) return (
      <>
        <TableCell sx={{ color: "red", fontWeight: "bold" }}>
          Sinulla on käytössä asetettu annostelunopeus!
          <Button onClick={() => { setOmaMlh(false); setVahvuusMuok({ ...vahvuusMuok, omaMlh: false, omaMlhValueH: 0, omaMlhValueVrk: 0 }) }}>Poista</Button>
        </TableCell>
      </>)
  }

  useEffect(() => {
    if ((muokkausTila.tiedot.valmiste !== "") && (muokkausTila.tiedot.laVahvuus !== 0) && (muokkausTila.tiedot.mgVrk !== 0)) {
      setLaakeTaulukko([...laakeTaulukko, muokkausTila.tiedot])
      setMuokkaustila({
        ...muokkausTila, paalla: false,
        tiedot: { valmiste: "", laVahvuus: 0, mgVrk: 0 }
      })
      localStorage.setItem("laakeaineet", JSON.stringify(laakeTaulukko))
    }
  }, [muokkausTila])


  return (
    <TableContainer sx={{ width: "70%" }}>
      <Table sx={{ borderRadius: "10px", backgroundColor: "lightgray", boxShadow: 5 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Valmiste</TableCell>
            <TableCell align="center">LA-Vahvuus (mg/ml)</TableCell>
            <TableCell align="center">mg/vrk</TableCell>
            <TableCell align="center">ml/vrk</TableCell>
            <TableCell align="center">mg/h</TableCell>
            <TableCell align="center">pit mg/ml</TableCell>
            <TableCell sx={{ backgroundColor: "lightgreen", fontSize: "12px" }} align="center">lääke-{<br></br>}annostelija ml 50</TableCell>
            <TableCell sx={{ backgroundColor: "lightgreen", fontSize: "12px" }} align="center">lääke-{<br></br>}annostelija ml 100</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {laakeTaulukko!.map((laake: Laakeannos, idx: number) => {

            let mlVrk = (omaMlh) ? ((laake.mgVrk / laake.laVahvuus) / mlVrkMuisti) * mlVrkSumma : laake.mgVrk / laake.laVahvuus;
            let nacl = laakeTaulukko!.filter((elem: Laakeannos) => elem.valmiste === "Natriumkloridi")[0]
            let naclMaara = (omaMlh) ? nacl?.mgVrk / mlVrkMuisti * mlVrkSumma : nacl?.mgVrk
            let mgH = mlVrk / 24 * laake.laVahvuus;
            let pitMgMl = mlVrk / mlVrkSumma * laake.laVahvuus
            let kasetti50 = mlVrk / mlVrkSumma * 50;
            let kasetti100 = mlVrk / mlVrkSumma * 100;
            console.log(laakeTaulukko);

            let nacl50 = 0
            let nacl100 = 0;

            if (laakeTaulukko!.filter((elem: Laakeannos) => elem.valmiste === "Natriumkloridi").length > 0) {
              nacl50 = naclMaara! / mlVrkSumma * 50;
              nacl100 = naclMaara! / mlVrkSumma * 100;
            }

            return (
              <>
                <Dialog open={vahvuusMuok.dialog}>
                  <DialogContent>
                    <DialogContentText>
                      Haluatko varmasti muuttaa lääkeaineen ({vahvuusMuok.nimi}) vahvuutta?
                    </DialogContentText>

                    <DialogActions>
                      <Button onClick={() => {
                        laakeTaulukko[vahvuusMuok.arvo].laVahvuus = vahvuusMuok.muutos;
                        setVahvuusMuok({ ...vahvuusMuok, paalla: false, arvo: 0, dialog: false }); setLaakeTaulukko([...laakeTaulukko])
                      }
                      }>Vahvista muokkaus</Button>
                      <Button onClick={() => setVahvuusMuok({ ...vahvuusMuok, paalla: false, arvo: 0, dialog: false })}>Peruuta</Button>
                    </DialogActions>
                  </DialogContent>
                </Dialog>
                <TableRow key={idx}>

                  <TableCell>
                    <IconButton onClick={() => poisto(idx)}><ClearIcon /></IconButton>
                    <Typography sx={{ display: "inline-block" }}>{laake.valmiste}</Typography>
                  </TableCell>

                  <TableCell
                    sx={
                      (ohje.sivu === 5)
                        ? { border: "5px solid blue" }
                        : {}
                    }
                    onDoubleClick={() => setVahvuusMuok({ ...vahvuusMuok, paalla: true, arvo: idx, nimi: laake.valmiste })} align="center">
                    {
                      (vahvuusMuok.paalla && vahvuusMuok.arvo === idx)
                        ? <TextField onBlur={(e) => setVahvuusMuok({ ...vahvuusMuok, dialog: true, muutos: e.target.value })} defaultValue={laake.laVahvuus} sx={{ width: "100%" }} />
                        : <Typography>{laake.laVahvuus}</Typography>
                    }
                  </TableCell>

                  <TableCell align="center" sx={
                    (ohje.sivu === 1)
                      ? { border: "5px solid blue" }
                      : {}
                  }>
                    {
                      (laake.valmiste === "Natriumkloridi")
                        ? <></>
                        : <TextField sx={{ backgroundColor: "orange", width: "150%" }} value={laake.mgVrk} onChange={(e) => {
                          laakeTaulukko[idx].mgVrk = Number(e.target.value);
                          setLaakeTaulukko([...laakeTaulukko])
                        }} />
                    }
                  </TableCell>

                  <TableCell align="center"
                    sx={
                      (ohje.sivu === 1)
                        ? { border: "5px solid blue" }
                        : (ohje.sivu === 3 && laake.valmiste === "Natriumkloridi")
                          ? { border: "5px solid blue" }
                          : {}
                    }>
                    <b>
                      {
                        (laake.valmiste === "Natriumkloridi")
                          ? <TextField sx={{ backgroundColor: "orange", width: "150%" }} value={Math.round(naclMaara * 100) / 100} onChange={(e) => {
                            laakeTaulukko[idx].mgVrk = Number(e.target.value);
                            setLaakeTaulukko([...laakeTaulukko])
                          }} />
                          : (mlVrk) === 0
                            ? <></>
                            : (Math.round(mlVrk * 100) / 100).toFixed(2)}</b>

                  </TableCell>
                  <TableCell align="center">{(mgH) === 0 || laake.valmiste === "Natriumkloridi" ? <></> : (Math.round(mgH * 100) / 100).toFixed(2)}</TableCell>
                  <TableCell align="center">{(pitMgMl) === 0 || laake.valmiste === "Natriumkloridi" ? <></> : (Math.round(pitMgMl * 100) / 100).toFixed(2)}</TableCell>
                  <TableCell align="center">{
                    (laake.valmiste === "Natriumkloridi" && nacl50!)
                      ? (nacl50!).toFixed(1)
                      : (kasetti50) === 0
                        ? <></>
                        : (kasetti50).toFixed(1)
                  }</TableCell>
                  <TableCell align="center">
                    {
                      (laake.valmiste === "Natriumkloridi" && nacl100!)
                        ? (nacl100!).toFixed(1)
                        : (kasetti100) === 0
                          ? <></>
                          : (kasetti100).toFixed(1)
                    }
                  </TableCell>
                </TableRow>
              </>
            )
          })
          }
          <TableRow>
            {
              (muokkausTila.paalla)
                ?
                <>
                  <TableCell>

                    <TextField type={"text"} onBlur={(e) => setMuokkaustila({ ...muokkausTila, tiedot: { ...muokkausTila.tiedot, valmiste: e.target.value } })} sx={{ backgroundColor: "orange" }}></TextField>

                  </TableCell>

                  <TableCell>

                    <TextField type={"number"} onBlur={(e) => setMuokkaustila({ ...muokkausTila, tiedot: { ...muokkausTila.tiedot, laVahvuus: Number(e.target.value) } })} sx={{ backgroundColor: "orange" }}></TextField>

                  </TableCell>

                  <TableCell>

                    <TextField type={"number"} onChange={(e) => setMuokkaustila({ ...muokkausTila, tiedot: { ...muokkausTila.tiedot, mgVrk: Number(e.target.value) } })} sx={{ backgroundColor: "orange" }}></TextField>

                  </TableCell>
                </>
                : <TableCell sx={{ width: "90%" }}><Valinta /></TableCell>
            }
          </TableRow>
          <TableRow>
            <TableCell padding="none" ></TableCell>
            <TableCell padding="none" ></TableCell>
            <TableCell padding="none" ><Typography fontSize={"12px"} sx={{ paddingLeft: "2" }}>Infuusionopeus</Typography></TableCell>
            <TableCell
              sx={
                (ohje.sivu === 2)
                  ? { border: "5px solid blue", backgroundColor: "yellow" }
                  : { backgroundColor: "yellow" }
              } align="center">{omaMlhTaiFixedMlh("vrk")}</TableCell>
            {/* {mlVrkSumma.toFixed(2)} */}
            <TableCell>ml/vrk</TableCell>
          </TableRow>
          <TableRow>
            <TableCell padding="none" ></TableCell>
            <TableCell padding="none" ></TableCell>
            <TableCell padding="none" ><Typography fontSize={"12px"}>Infuusionopeus</Typography></TableCell>
            <TableCell sx={
              (ohje.sivu === 2)
                ? { border: "5px solid blue", backgroundColor: "yellow" }
                : { backgroundColor: "yellow" }
            } align="center">{omaMlhTaiFixedMlh("h")}</TableCell>
            {/* {(mlVrkSumma / 24).toFixed(2)} */}
            <TableCell>ml/h</TableCell>
          </TableRow>
          <TableRow>
            <TableCell padding="none" ></TableCell>
            <TableCell padding="none" ></TableCell>
            <TableCell padding="none" ><Typography></Typography></TableCell>
            <TableCell
              onDoubleClick={() => setVahvuusMuok({ ...vahvuusMuok, omaMlh: true })}
              sx={
                (ohje.sivu === 2)
                  ? { border: "5px solid blue", backgroundColor: "yellow" }
                  : { backgroundColor: "yellow" }
              } align="center">{omaMlhContent()}</TableCell>
            {renderOmaMlhVaroitus()}
          </TableRow>
        </TableBody>
      </Table>

      <GenericDialog dialogOpen={vahvuusMuok.omaDialog} dialogTitle={"Oma vahvuusnopeus"} dialogOptions={setVahvuusMuok}>
        <Typography textAlign={"center"}>
          Olet asettamassa annostelunopeuden manuaalisesti. Varmistathan, että kaikki arvot ovat oikein!
          <br />
          <Button onClick={mlhSet}>Ok</Button>
          <Button onClick={() => setVahvuusMuok({ ...vahvuusMuok, omaDialog: false })}>Peruuta</Button>
        </Typography>
      </GenericDialog>

    </TableContainer>
  )
}
