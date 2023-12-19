import React, { useState } from "react";
import { Team as TeamType } from "../types/types";
import { Button, Card, Form, Row, Col } from "react-bootstrap";

type Props = {
  gameIndex: number;
  teamIndex: number;
  team: TeamType;
  handleEditPlayer: (
    gameIndex: number,
    teamIndex: number,
    playerIndex: number,
    newName: string,
    newAge: number
  ) => void;
  handleAddPlayer: (
    gameIndex: number,
    teamIndex: number,
    playerName: string,
    playerAge: number
  ) => void;
};

const Team: React.FC<Props> = ({
  gameIndex,
  teamIndex,
  team,
  handleEditPlayer,
  handleAddPlayer,
}) => {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerAge, setNewPlayerAge] = useState("");
  const [showAll, setShowAll] = useState(3);

  const handleEdit = (playerIndex: number, newName: string, newAge: string) => {
    handleEditPlayer(
      gameIndex,
      teamIndex,
      playerIndex,
      newName,
      parseInt(newAge)
    );
  };

  const handleAdd = () => {
    if (newPlayerName && newPlayerAge) {
      handleAddPlayer(
        gameIndex,
        teamIndex,
        newPlayerName,
        parseInt(newPlayerAge)
      );
      setNewPlayerName("");
      setNewPlayerAge("");
    }
  };

  return (
    <Card.Body>
      <Card.Title className="md-3">
        {team.team_name} ({team.players.length})
      </Card.Title>
      <Card.Text className="mt-3 p-4">
        <Row className="mb-2">
          <Col md={7}>
            <Form.Control
              type="text"
              placeholder="Player Name"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Age"
              value={newPlayerAge}
              onChange={(e) => setNewPlayerAge(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Button
              variant="info"
              onClick={handleAdd}
              style={{ width: "65px" }}
            >
              Add
            </Button>
          </Col>
        </Row>
        {team.players.map((player, playerIndex) => (
          <div key={playerIndex}>
            {playerIndex < showAll && (
              <Row className="mb-2">
                <Col md={7}>
                  <Form.Control
                    type="text"
                    placeholder="Normal text"
                    value={player.name}
                    onChange={(e) => {
                      const newName = e.target.value;
                      const newAge = player.age; // Keep the age as it is
                      handleEdit(playerIndex, newName, newAge.toString());
                    }}
                  />
                </Col>
                <Col md={3}>
                  <Form.Control
                    type="text"
                    placeholder="Normal text"
                    value={player.age}
                    onChange={(e) => {
                      const newAge = e.target.value;
                      const newName = player.name;
                      handleEdit(playerIndex, newName, newAge);
                    }}
                  />
                </Col>
                <Col md={2}>
                  <Button
                    variant="info"
                    style={{ width: "65px" }}
                    onClick={() =>
                      handleEdit(
                        playerIndex,
                        player.name,
                        player.age.toString()
                      )
                    }
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            )}
          </div>
        ))}
        {showAll == team.players.length ? (
          <div onClick={() => setShowAll(3)} className="show-less-feature">
            Show less
          </div>
        ) : (
          team.players.length > 3 && (
            <div
              className="show-more-feature"
              onClick={() => setShowAll(team.players.length)}
            >
              <li></li>
              <li></li>
              <li></li>
            </div>
          )
        )}
      </Card.Text>
    </Card.Body>
  );
};

export default Team;
