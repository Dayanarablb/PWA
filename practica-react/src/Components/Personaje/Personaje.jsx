import styles from './personaje.module.css';
import PropTypes from "prop-types";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const PersonajeCard = ({ nombre, especie, imagen }) => {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={imagen}
                title={nombre}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {especie}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
};

PersonajeCard.propTypes = {
    nombre: PropTypes.string.isRequired,
    especie: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired
};