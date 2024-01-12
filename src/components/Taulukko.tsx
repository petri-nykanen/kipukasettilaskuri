import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, Typography, IconButton, DialogContentText, DialogActions, Dialog, DialogContent, Button } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context, Laakeannos } from '../context/context'
import { Valinta } from './Valinta';



export const Taulukko : React.FC = () : React.ReactElement => {

    const { laakeTaulukko, mlVrkSumma, ohje, setLaakeTaulukko, muokkausTila, setMuokkaustila, setVaihtoehdot, vaihtoehdot, omaMlh, setOmaMlh } = useContext(Context)

    const [vahvuusMuok, setVahvuusMuok] = useState<any>({
      paalla : false,
      arvo : 0,
      dialog : false,
      nimi : "",
      muutos : 0,
      omaMlh : false,
      omaMlhValue : 0
    }) 

    const omaMlhContent = () => {
      if (vahvuusMuok.omaMlh) return (
        <>
        <TextField
        onChange={(e) => setVahvuusMuok({...vahvuusMuok, omaMlhValue : e.target.value})} 
        type='number' 
        sx={{backgroundColor:"white", mb:"5%"}}></TextField>
        <Button 
        onClick={() => setOmaMlh(vahvuusMuok.omaMlhValue)}
        variant={'outlined'}>Ok</Button>
        </>
      )
      else return (
      <Button 
      variant={'contained'} 
      onClick={() => setVahvuusMuok({...vahvuusMuok, omaMlh : true})}
      sx={{backgroundColor:"orange", "&:hover":{backgroundColor:"darkorange"}}}>
      Oma</Button>)
    }

    const poisto = (indeksi : number) => {
      setLaakeTaulukko(laakeTaulukko.filter((elementti : any) => {return elementti !== laakeTaulukko[indeksi]}))
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
      setVaihtoehdot([...vaihtoehdot, laakeTaulukko[indeksi]].sort((a : Laakeannos, b : Laakeannos) => {
        if(a.valmiste > b.valmiste)
          return 1
        else
          return -1
      }))
    }

    const renderOmaMlhVaroitus = () => {
      if (omaMlh) return (
      <>
      <TableCell sx={{color:"red", fontWeight:"bold"}}>
      Sinulla on käytössä asetettu annostelunopeus!
      <Button onClick={() => {setOmaMlh(0); setVahvuusMuok({...vahvuusMuok, omaMlh : false, omaMlhValue : 0})}}>Poista</Button>
      </TableCell>
      </>)
    }

    useEffect(() => {
      if ((muokkausTila.tiedot.valmiste !== "") && (muokkausTila.tiedot.laVahvuus !== 0) && (muokkausTila.tiedot.mgVrk !== 0))
      {
        setLaakeTaulukko([...laakeTaulukko, muokkausTila.tiedot])
        setMuokkaustila({...muokkausTila, paalla : false,
          tiedot : {valmiste : "", laVahvuus: 0, mgVrk : 0}})
        localStorage.setItem("laakeaineet", JSON.stringify(laakeTaulukko))
      }
    }, [muokkausTila])
    

  return (
    <TableContainer sx={{width:"70%"}}>
    <Table sx={{ borderRadius:"10px", backgroundColor:"lightgray", boxShadow: 5}} aria-label="simple table">
      <TableHead>
        <TableRow>
        <TableCell>Valmiste</TableCell>
          <TableCell align="center">LA-Vahvuus (mg/ml)</TableCell>
          <TableCell align="center">mg/vrk</TableCell>
          <TableCell align="center">ml/vrk</TableCell>
          <TableCell align="center">mg/h</TableCell>
          <TableCell align="center">pit mg/ml</TableCell>
          <TableCell sx={{backgroundColor:"lightgreen", fontSize:"12px"}} align="center">lääke-{<br></br>}annostelija ml 50</TableCell>
          <TableCell sx={{backgroundColor:"lightgreen", fontSize:"12px"}} align="center">lääke-{<br></br>}annostelija ml 100</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { laakeTaulukko!.map((laake : Laakeannos, idx : number) => {

          let nacl = laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi")[0]
          let mlVrk = laake.mgVrk / laake.laVahvuus;
          let mgH = mlVrk / 24 * laake.laVahvuus;
          let pitMgMl = mlVrk / mlVrkSumma * laake.laVahvuus
          let kasetti50 = mlVrk / mlVrkSumma * 50;
          let kasetti100 = mlVrk / mlVrkSumma * 100;
          // let riittavyys50kaVrk = kasetti50 / mlVrk;
          let nacl50 = 0
          let nacl100 = 0;

          if (laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi").length > 0)
          {
            nacl50 = nacl!.mgVrk! / mlVrkSumma * 50;
            nacl100 = nacl!.mgVrk! / mlVrkSumma * 100;
          }

            return (
              <>
              <Dialog open={vahvuusMuok.dialog}>
                <DialogContent>
                  <DialogContentText>
                    Haluatko varmasti muuttaa lääkeaineen ({vahvuusMuok.nimi}) vahvuutta?
                  </DialogContentText>

                  <DialogActions>
                    <Button onClick={() => {laakeTaulukko[vahvuusMuok.arvo].laVahvuus = vahvuusMuok.muutos;
                    setVahvuusMuok({...vahvuusMuok, paalla : false, arvo : 0, dialog : false}); setLaakeTaulukko([...laakeTaulukko])}
                    }>Vahvista muokkaus</Button>
                    <Button onClick={() => setVahvuusMuok({...vahvuusMuok, paalla : false, arvo : 0, dialog : false})}>Peruuta</Button>
                  </DialogActions>
                </DialogContent>
              </Dialog>
              <TableRow key={idx}>

                <TableCell> 
                    <IconButton onClick={() => poisto(idx)}><ClearIcon/></IconButton>
                    <Typography sx={{display:"inline-block"}}>{laake.valmiste}</Typography>
                  </TableCell>

                <TableCell 
                sx={
                  (ohje.sivu === 5)
                  ?{border:"5px solid blue"}
                  :{}
                }
                onDoubleClick={() => setVahvuusMuok({...vahvuusMuok, paalla : true, arvo : idx, nimi : laake.valmiste})} align="center">
                  {
                    (vahvuusMuok.paalla && vahvuusMuok.arvo === idx)
                    ? <TextField onBlur={(e) => setVahvuusMuok({...vahvuusMuok, dialog : true, muutos : e.target.value})} defaultValue={laake.laVahvuus} sx={{width:"100%"}}/>
                    : <Typography>{laake.laVahvuus}</Typography>
                  }
                  </TableCell>

                <TableCell align="center" sx={
                  (ohje.sivu === 1)
                  ?{border:"5px solid blue"}
                  :{}
                  }>
                  {
                    (laake.valmiste === "Natriumkloridi")
                    ? <></>
                    : <TextField sx={{backgroundColor:"orange", width:"150%"}} defaultValue={laake.mgVrk} onChange={(e) => {laakeTaulukko[idx].mgVrk = e.target.value; 
                    setLaakeTaulukko([...laakeTaulukko])
                    }}/>
                  }
                  </TableCell>

                <TableCell align="center"
                sx={
                  (ohje.sivu === 1)
                  ?{border:"5px solid blue"}
                  :(ohje.sivu === 3 && laake.valmiste === "Natriumkloridi")
                  ?{border:"5px solid blue"}
                  :{}
                  }>
                <b>
                  {
                  (laake.valmiste === "Natriumkloridi")
                  ? <TextField sx={{backgroundColor:"orange", width:"150%"}} defaultValue={laake.mgVrk} onChange={(e) => {laakeTaulukko[idx].mgVrk = e.target.value;
                    setLaakeTaulukko([...laakeTaulukko])
                  }}/>
                  : (mlVrk) === 0 
                  ?<></> 
                  :(Math.round(mlVrk * 100) / 100).toFixed(2)}</b>
                
                </TableCell>
                <TableCell align="center">{(mgH) === 0 ?<></> :(Math.round(mgH * 100) / 100).toFixed(2)}</TableCell>
                <TableCell align="center">{(pitMgMl) === 0 ?<></> :(Math.round(pitMgMl * 100) / 100).toFixed(2)}</TableCell>
                <TableCell align="center">{
                (laake.valmiste === "Natriumkloridi" && nacl50!)
                ?(nacl50!).toFixed(1)
                :(kasetti50) === 0 
                ?<></>
                :(kasetti50).toFixed(1)
                }</TableCell>
                <TableCell align="center">
                {
                (laake.valmiste === "Natriumkloridi" && nacl100!)
                ?(nacl100!).toFixed(1)
                :(kasetti100) === 0 
                ?<></>
                :(kasetti100).toFixed(1)
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

              <TextField type={"text"} onBlur={(e) => setMuokkaustila({...muokkausTila, tiedot : {...muokkausTila.tiedot, valmiste : e.target.value}})} sx={{backgroundColor:"orange"}}></TextField>
              
              </TableCell>

            <TableCell>
                          
            <TextField type={"number"} onBlur={(e) => setMuokkaustila({...muokkausTila, tiedot : {...muokkausTila.tiedot, laVahvuus : Number(e.target.value)}})} sx={{backgroundColor:"orange"}}></TextField>

            </TableCell>

            <TableCell>
                          
              <TextField type={"number"} onChange={(e) => setMuokkaustila({...muokkausTila, tiedot : {...muokkausTila.tiedot, mgVrk : Number(e.target.value)}})} sx={{backgroundColor:"orange"}}></TextField>
  
              </TableCell>
            </>
            : <TableCell sx={{width:"90%"}}><Valinta/></TableCell>
          }
        </TableRow>
                    <TableRow>
                        <TableCell padding="none" ></TableCell>
                        <TableCell padding="none" ></TableCell>
                        <TableCell padding="none" ><Typography fontSize={"12px"} sx={{paddingLeft:"2"}}>Infuusionopeus</Typography></TableCell>
                        <TableCell
                         sx={
                  (ohje.sivu === 2)
                  ?{border:"5px solid blue", backgroundColor:"yellow"}
                  :{backgroundColor:"yellow"}
                  } align="center">{mlVrkSumma.toFixed(2)}</TableCell>
                        <TableCell>ml/vrk</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding="none" ></TableCell>
                        <TableCell padding="none" ></TableCell>
                        <TableCell padding="none" ><Typography fontSize={"12px"}>Infuusionopeus</Typography></TableCell>
                        <TableCell sx={
                  (ohje.sivu === 2)
                  ?{border:"5px solid blue", backgroundColor:"yellow"}
                  :{backgroundColor:"yellow"}
                  } align="center">{(mlVrkSumma / 24).toFixed(2)}</TableCell>
                  <TableCell>ml/h</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding="none" ></TableCell>
                        <TableCell padding="none" ></TableCell>
                        <TableCell padding="none" ><Typography fontSize={"12px"}>Infuusionopeus</Typography></TableCell>
                        <TableCell 
                        onDoubleClick={() => setVahvuusMuok({...vahvuusMuok, omaMlh : true})}
                        sx={
                  (ohje.sivu === 2)
                  ?{border:"5px solid blue", backgroundColor:"yellow"}
                  :{backgroundColor:"yellow"}
                  } align="center">{omaMlhContent()}</TableCell>
                    <TableCell>ml/h</TableCell>
                    {renderOmaMlhVaroitus()}
                    </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  )
}
