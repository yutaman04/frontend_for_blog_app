import { HEADER_TITLE } from "@/config/constantText";
import { AppBar, Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

interface Props {}

export default function Header() {
    return (
        <>
            <AppBar>
                <Box className="relative">
                    <Image src={"/images/header_hero.jpg"} alt={""} width={2000} height={50}/>
                    <Typography className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold">{HEADER_TITLE}</Typography>
                </Box>
                <Box className="relative items-center justify-center" style={{height: 50}}>
                    <Grid container spacing={0.5 } className="absolute inset-0 flex items-center justify-center font-extrabold text-center">
                        <Grid item xs={4}>
                            <a>記事一覧</a>
                        </Grid>
                        <Grid item xs={4}>
                            <a>自己紹介</a>
                        </Grid>
                        <Grid item xs={4}>
                            <a>プライバシーポリシー</a>
                        </Grid>
                    </Grid>
                </Box>
            </AppBar>
        </>
    )
}