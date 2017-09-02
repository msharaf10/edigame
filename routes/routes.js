const express = require( 'express' );

const users = require( '../controllers/users' );
const teams = require( '../controllers/teams' );
const auth = require( '../controllers/auth' );
const rooms = require( '../controllers/rooms' );

const app = express();
const router = express.Router();

// TODO params ( id ) middleware

// Routes
router.route( '/' )
	.get( ( req, res, next ) => {
		res.send( 'test routes' );
	});

router.route( '/users' )
	.get( users.getUsers )
	.post( users.createUser );

router.route( '/users/:id')
	.get( users.getUserById )
	.put( users.updateUserById )
	.delete( users.deleteUserById );

router.route( '/teams' )
	.get( teams.getTeams )
	.post( auth.adminRequired, teams.createTeam );

router.route( '/teams/:id' )
	.get( teams.getTeamById )
	.put( auth.adminRequired, teams.updateTeamById )
	.delete( auth.adminRequired, teams.deleteTeamById );

router.get( '/teams/:id/ready', ( teams.getReadyUsers ) );
router.post( '/teams/:id/ready/toggle' , teams.toggleReadyUser )
/*
router.route( '/rooms' )
	.get( rooms.getRooms )
	.post( auth.leaderRequired, rooms.initRoom );

router.route( '/room/:roomId/:team' )
	.get( rooms.getUserRoom )
	.put( auth.leaderRequired, rooms.updateTeam )
	.delete( auth.leaderRequired, rooms.deleteRoomById );
*/
router.post( '/auth/token' ,  auth.loginUser  );

module.exports = router;
