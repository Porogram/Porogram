import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography,
    List,
    ListItem,
    Avatar,
    Divider,
    Grid,
} from '@material-ui/core'
import notFoundDoge from '../../images/not-found-doge.jpg'

const styles = theme => ({
    avatar: {
        width: 60,
        height: 60,
        marginRight: 20,
    },
    champName: {
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    item: {
        height: 30,
        width: 30,
    },
    items: {
        width: '13%',
    },
    img: {
        height: 30,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    playerList: {
        fontSize: 15,
        padding: '5px 10px',
    },
    playersItemList: {
        marginRight: 0,
    },
    playerItem: {
        width: 30,
        height: 30,
        margin: 4,
    },
    playerAvatar: {
        width: 40,
        height: 40,
        marginRight: 20,
    },
    list: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
    },
    kda: {
        width: '10%',
        display: 'block',
        margin: 'auto 10px',
    },
    doubleIcon: {
        width: '5%',
    },
    secondary: {
        height: 15,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    trinket: {
        height: 30,
        display: 'block',
        marginTop: 'auto',
        marginBottom: 'auto',
    }
})

const Image = ({source, classes}) => {
    return(
        <Grid item>
            <img
                src={source}
                alt=""
                className={classes}
            />
        </Grid>
    )
}

export default withStyles(styles)(class extends Component {
    constructor(props) {
        super(props)
        this.state = { newSummoner: '' }
    }
    getSummoner = participantIdentity => {
        'summonerId' in participantIdentity.player &&
        this.setState({ newSummoner: participantIdentity.player.summonerName })
    }
    render() {
      const { classes, match, summoner, staticData } = this.props
      const { newSummoner } = this.state
      const { participants, participantIdentities } = match
      const { version, champions, summonerSpells, runes } = staticData
      if (newSummoner.length) return <Redirect push to={`/summoner/${newSummoner}/matches`} />
      const summonerIndex = participantIdentities.findIndex(participant =>
          participant.player.accountId === summoner.accountId
      )
      participants.forEach(participant => {
          participant.champion = Object.values(champions).find(champion =>
              participant.championId === parseInt(champion.key, 10)).id
          if (participant.spell1Id !== 0)
              participant.summonerSpell1 = Object.values(summonerSpells).find(summonerSpell =>
                  participant.spell1Id === parseInt(summonerSpell.key, 10)).id
          if (participant.spell2Id !== 0)
              participant.summonerSpell2 = Object.values(summonerSpells).find(summonerSpell =>
                  participant.spell2Id === parseInt(summonerSpell.key, 10)).id
          participant.rune1 = runes.find(rune =>
              participant.stats.perkPrimaryStyle === rune.id).slots[0].runes.find(rune =>
              participant.stats.perk0 === rune.id).icon
          participant.rune2 = runes.find(rune =>
              participant.stats.perkSubStyle === rune.id).icon
      })
      return (
          <ExpansionPanel>
              <ExpansionPanelSummary>
                  <Avatar
                      src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${participants[summonerIndex].champion}.png`}
                      alt=""
                      className={classes.avatar}
                  />
                  <Grid container direction="column" className={classes.doubleIcon}>
                      <Image source={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${participants[summonerIndex].summonerSpell1}.png`} classes={classes.item}/>
                      <Image source={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${participants[summonerIndex].summonerSpell2}.png`} classes={classes.item}/>
                  </Grid>
                  <Grid container direction="column"  className={classes.doubleIcon} justify="center">
                      <Image source={`http://ddragon.leagueoflegends.com/cdn/img/${participants[summonerIndex].rune1}`} classes={classes.img}/>
                      <Image source={`http://ddragon.leagueoflegends.com/cdn/img/${participants[summonerIndex].rune2}`} classes={classes.secondary}/>
                  </Grid>


                  <Typography variant="headline" className={classes.kda}>
                      {participants[summonerIndex].stats.kills}/
                      {participants[summonerIndex].stats.deaths}/
                      {participants[summonerIndex].stats.assists}
                  </Typography>
                  <div className={classes.items}>
                      {[...Array(6).keys()].map(i => {
                          return participants[summonerIndex].stats[`item${i}`] === 0 ?
                              <img src={notFoundDoge} alt="" className={classes.item} key={i} /> :
                              <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${participants[summonerIndex].stats[`item${i}`]}.png`} alt="" className={classes.item} key={i} />
                      })}
                  </div>
                  <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${participants[summonerIndex].stats[`item6`]}.png`} alt="" className={classes.trinket}/>
              </ExpansionPanelSummary>
              <Divider />
              <ExpansionPanelDetails>
                  <List className={classes.list}>
                      {participants.map((participant, participantIndex) =>
                          <ListItem button key={participantIndex} className={classes.playerList}>
                              <Avatar src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${participant.champion}.png`} alt="" className={classes.playerAvatar}/>
                              <Grid container direction="column" className={classes.doubleIcon}>
                                  {participant.summonerSpell1 === 0 ?
                                      <img src={notFoundDoge} alt="" className={classes.item}/> :
                                      <Image source={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${participant.summonerSpell1}.png`} classes={classes.item}/>
                                  }
                                  {participant.summonerSpell2 === 0 ?
                                      <img src={notFoundDoge} alt="" className={classes.item}/> :
                                      <Image source={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${participant.summonerSpell2}.png`} classes={classes.item}/>
                                  }
                              </Grid>
                              <Grid container direction="column" className={classes.doubleIcon} justify="center">
                                  <Image source={`http://ddragon.leagueoflegends.com/cdn/img/${participant.rune1}`} classes={classes.img}/>
                                  <Image source={`http://ddragon.leagueoflegends.com/cdn/img/${participant.rune2}`} classes={classes.secondary}/>
                              </Grid>

                              <Typography variant="body2" className={classes.kda}>
                                  {participantIdentities[participantIndex].player.summonerName}
                              </Typography>
                              <Typography variant="body1" className={classes.kda}>
                                  {participant.stats.kills}/
                                  {participant.stats.deaths}/
                                  {participant.stats.assists}
                              </Typography>
                              <div className={classes.items}>
                                  {[...Array(6).keys()].map(i =>

                                      participant.stats[`item${i}`] === 0 ?
                                          <img src={notFoundDoge} alt="" className={classes.item} key={i} /> :
                                          <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${participant.stats[`item${i}`]}.png`} alt="" className={classes.item} key={i} />
                                  )}
                              </div>
                              <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${participant.stats[`item6`]}.png`} alt="" className={classes.trinket }/>
                          </ListItem>
                      )}
                  </List>
              </ExpansionPanelDetails>
          </ExpansionPanel>
      )
   }
})
