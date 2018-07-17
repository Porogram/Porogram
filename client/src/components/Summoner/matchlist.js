import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper , Typography } from '@material-ui/core'
import Match from './match'
import axios from 'axios'

const styles = theme => ({
    main: {
        marginLeft: 60,
        marginRight: 60,
    },
    paper: {
        padding: '25px 30px',
        position: 'static',
    },
    title: {
        position: 'static',
        margin: '30px 0',
        textAlign: 'center',
    },
})

export default withStyles(styles)(class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            champData: {},
        }
        axios.get('http://ddragon.leagueoflegends.com/cdn/8.13.1/data/en_US/champion.json').then(res => {
            console.log(res.data.data)
            this.setState({ champData: res.data.data})
        })
    }
    render() {
        const { classes } = this.props
        if (this.props.summonerData.matches == null || this.props.summonerData.summoner == null)
            return null
        return (
            <div className={classes.main}>
                <Typography variant="display2" className={classes.title}>Match History</Typography>
                <Paper className={classes.paper}>
                    {this.props.summonerData.matches.map((object, i) =>
                        <Match className={classes.match}
                            key={i}
                            match={this.props.summonerData.matches[i]}
                            version={this.props.summonerData.version}
                            summoner={this.props.summonerData.summoner}
                            champData={this.state.champData}
                        />
                    )}
                </Paper>
            </div>
        )
    }
})
