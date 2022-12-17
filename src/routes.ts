import app from './app'
import { isAuthenticatedMiddleware } from './middlewares'
import {
  acceptInviteFriendShipController,
  changeDescriptionController,
  readMessageController,
  recvMessageController,
  refuseInviteFriendShipController,
  sendInviteFriendShipController,
  sendMessageController,
  signInController,
  signUpController
} from './controllers'

app.patch('/acceptInviteFriendShip/:idInviteFriendShip', isAuthenticatedMiddleware, acceptInviteFriendShipController)
app.patch('/changeDescription', isAuthenticatedMiddleware, changeDescriptionController)
app.patch('/readMessage/:idChatMessage', isAuthenticatedMiddleware, readMessageController)
app.patch('/recvMessage/:idChatMessage', isAuthenticatedMiddleware, recvMessageController)
app.patch('/refuseInviteFriendShip/:idInviteFriendShip', isAuthenticatedMiddleware, refuseInviteFriendShipController)
app.post('/sendInviteFriendShip', isAuthenticatedMiddleware, sendInviteFriendShipController)
app.post('/sendMessage', isAuthenticatedMiddleware, sendMessageController)
app.post('/signIn', isAuthenticatedMiddleware, signInController)
app.post('/signUp', isAuthenticatedMiddleware, signUpController)
