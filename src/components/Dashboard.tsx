import React, { useState, useEffect, Fragment } from "react";
import Team from "./Team";
import playerStore from "../stores/playerStore";
import { editPlayer, addPlayer } from "../actions/actions";
import { Game } from "../types/types";
import { Card, Row, Col } from "react-bootstrap";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<Game[]>(playerStore.getData());

  useEffect(() => {
    const handleStoreChange = () => {
      setData(playerStore.getData());
    };

    playerStore.on("change", handleStoreChange);

    // Return a cleanup function to remove the listener
    return () => {
      playerStore.removeListener("change", handleStoreChange);
    };
  }, [playerStore, setData]);

  const handleEditPlayer = (
    gameIndex: number,
    teamIndex: number,
    playerIndex: number,
    newName: string,
    newAge: number
  ) => {
    editPlayer(gameIndex, teamIndex, playerIndex, newName, newAge);
  };

  const handleAddPlayer = (
    gameIndex: number,
    teamIndex: number,
    playerName: string,
    playerAge: number
  ) => {
    addPlayer(gameIndex, teamIndex, playerName, playerAge);
  };

  return (
    <Fragment>
      {data.map((game, gameIndex) => (
        <Row className="justify-content-md-center mt-5" key={gameIndex}>
          <Col md={7}>
            <Card key={gameIndex}>
              <Card.Header>
                <b>{game.game}</b>
              </Card.Header>
              {game.teams.map((team, teamIndex) => (
                <Team
                  key={teamIndex}
                  gameIndex={gameIndex}
                  teamIndex={teamIndex}
                  team={team}
                  handleEditPlayer={handleEditPlayer}
                  handleAddPlayer={handleAddPlayer}
                />
              ))}
            </Card>
          </Col>
        </Row>
      ))}
    </Fragment>
  );
};

export default Dashboard;
