import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  Grid
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';
import SyncIcon from '@material-ui/icons/Sync';
import StarIcon from '@material-ui/icons/Star';
import { formatDate } from '../../helpers/helpers';
import { Calorie } from '../../helpers/types';
import { CalorieFilter } from './useCalorie';

type CalorieFilterDetailProps = {
  data: Calorie[];
  filter: CalorieFilter;
};

export const CalorieFilterDetail = (props: CalorieFilterDetailProps) => {
  const classes = useStyles();
  const { data, filter } = props;
  const { caloriesBurnedSum, deficitSum, fat, weightSum, caloriesConsumedSum } = useCalorieDetail({
    data
  });

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography className={classes.heading}>
          Detail výsledkov: {formatDate(filter.dateFrom)} - {formatDate(filter.dateTo)}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordion}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Card className={classes.card}>
              <CardHeader
                avatar={<LocalPizzaIcon className={classes.icon} />}
                title="Prijaté kalórie"
                subheader="Celkové prijaté kalórie za dané obdobie."
              />

              <CardContent>
                <div className={classes.content}>{caloriesConsumedSum} kcal</div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Card className={classes.card}>
              <CardHeader
                avatar={<WhatshotIcon className={classes.icon} />}
                title="Spálené kalórie"
                subheader="Celkové splálené kalórie za dané obdobie."
              />

              <CardContent>
                <div className={classes.content}>{caloriesBurnedSum} kcal</div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Card className={classes.card}>
              <CardHeader
                avatar={<AssistantPhotoIcon className={classes.icon} />}
                title="Celkový kalorický deficit / surplus"
                subheader="Celkový kalorický deficit alebo surplus za dané obdobie."
              />

              <CardContent>
                <div className={classes.content}>{deficitSum} kcal</div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Card className={classes.card}>
              <CardHeader
                avatar={<SyncIcon className={classes.icon} />}
                title="Prírastok / úbytok hmotnosti"
                subheader="Vyjadruje celkový prírastok alebo úbytok hmotnosti za dané obdobie."
              />

              <CardContent>
                <div className={classes.content}>{weightSum.toFixed(2)} kg</div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Card className={classes.card}>
              <CardHeader
                avatar={<StarIcon className={classes.icon} />}
                title="Hmotnosť tuku"
                subheader="Odhadovaná hmotnosť spláleného tuku."
              />

              <CardContent>
                <div className={classes.content}>{fat.toFixed(2)} kg</div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Card className={classes.card}>
              <CardHeader
                avatar={<AssessmentIcon className={classes.icon} />}
                title="Hmotnostný rozdiel"
                subheader="Vyjadruje rozdiel hmotnosti v podobe vody alebo svalstva."
              />

              <CardContent>
                <div className={classes.content}>{(weightSum - fat).toFixed(2)} kg</div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

type UseCalorieDetailProps = {
  data: Calorie[];
};

const useCalorieDetail = (props: UseCalorieDetailProps) => {
  const { data } = props;
  let caloriesBurnedSum = 0;
  let caloriesConsumedSum = 0;
  let deficitSum = 0;
  let weightSum = 0;
  data.forEach((item) => (caloriesBurnedSum = caloriesBurnedSum + item.caloriesBurned));
  data.forEach((item) => (caloriesConsumedSum = caloriesConsumedSum + item.caloriesConsumed));
  data.forEach((item) => (deficitSum = deficitSum + Number(item.deficit)));
  data.forEach((item) => (weightSum = weightSum + item.weight));

  const fat = deficitSum / 7700;

  return { caloriesBurnedSum, caloriesConsumedSum, deficitSum, weightSum, fat };
};

const useStyles = makeStyles((theme: any) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold
  },
  card: {
    maxWidth: '100%',
    opacity: 0.88
  },
  accordion: {
    backgroundImage: 'url("/login-bg3.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
  icon: {},
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.secondary.main,
    fontSize: theme.typography.pxToRem(30)
  }
}));
