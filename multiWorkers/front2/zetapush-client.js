(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.ZetaPushClient = {})));
}(this, (function (exports) { 'use strict';

    /**
     * @access protected
     */
    class Service {
      constructor({
        $publish
      }) {
        this.$publish = $publish;
      }

    }

    var Idempotence;

    (function (Idempotence) {
      /**The operation will not fail if the entity already exists in a different and compatible form.*/
      Idempotence["IGNORE_DIFFERENT"] = "IGNORE_DIFFERENT";
      /**The operation will fail if the entity already exists*/

      Idempotence["FAIL_IF_EXISTING"] = "FAIL_IF_EXISTING";
      /**The operation will not fail if the entity already exists in a similar form.*/

      Idempotence["IGNORE_IDENTICAL"] = "IGNORE_IDENTICAL";
    })(Idempotence || (Idempotence = {}));

    var PageDirection;

    (function (PageDirection) {
      /**Descending order*/
      PageDirection["DESC"] = "DESC";
      /**Ascending order*/

      PageDirection["ASC"] = "ASC";
    })(PageDirection || (PageDirection = {}));

    var FileType;

    (function (FileType) {
      /**Normal file*/
      FileType["FILE"] = "FILE";
      /**Directory. May contain other files.*/

      FileType["DIR"] = "DIR";
    })(FileType || (FileType = {}));

    var AggregationItemType;

    (function (AggregationItemType) {
      /**Averages the item over the period (floating point values).*/
      AggregationItemType["MEAN"] = "MEAN";
      /**Sums the item over the period (integral values only).*/

      AggregationItemType["TOTAL"] = "TOTAL";
    })(AggregationItemType || (AggregationItemType = {}));

    /**
     * Delegating authentication
     *
     * This authentication delegates authentication to an external auth provider
     * <br>When a zetapush client handshakes with a delegated authentication, the 'token' field given by the client is sent to the configured remote server as part of the URL
     * <br>The response must be in JSON format
     *  Each key of the response will be considered a user information field name
     * <br>The handshake from the server will return the primary key in a field named 'login' (regardless of the actual key name you might have chosen)
     * */

    class Delegating extends Service {
      /**
       * Get deployment type associated to Delegating service
       * @return {string}
       */
      static get DEPLOYMENT_TYPE() {
        return 'delegating';
      }
      /**
       * Get default deployment id associated to Delegating service
       * @return {string}
       */


      static get DEFAULT_DEPLOYMENT_ID() {
        return 'delegating_0';
      }
      /**
       * End-user API for the delegating authentication
       *
       * Provisioning verbs.
       * @access public
       * */

      /**
       * Get user info
       *
       * Retrieves cached user info or (if missing) eagerly creates a zetapush key for the user.
       * The returned field 'zetapushKey' is a unique and permanent ID identifying a user in a sandbox.
       * @access public
       * */


      userInfo(body) {
        return this.$publish('userInfo', body);
      }

    }

    var GameStatus;

    (function (GameStatus) {
      /**The game is running*/
      GameStatus["RUNNING"] = "RUNNING";
      /**The game is finished*/

      GameStatus["FINISHED"] = "FINISHED";
      /**The game has been created*/

      GameStatus["CREATED"] = "CREATED";
      /**The game is starting*/

      GameStatus["STARTING"] = "STARTING";
    })(GameStatus || (GameStatus = {}));

    var GdaDataType;

    (function (GdaDataType) {
      /**64-bit signed integer. This is the only eligible type for the 'inc' API call*/
      GdaDataType["LONG"] = "LONG";
      /**Character String*/

      GdaDataType["STRING"] = "STRING";
      /**Boolean value : true or false*/

      GdaDataType["BOOLEAN"] = "BOOLEAN";
      /**Floating point number*/

      GdaDataType["DOUBLE"] = "DOUBLE";
      /**Complex object*/

      GdaDataType["OBJECT"] = "OBJECT";
    })(GdaDataType || (GdaDataType = {}));

    var HttpClientParseMode;

    (function (HttpClientParseMode) {
      /**Content is interpreted as a UTF8 character string*/
      HttpClientParseMode["STRING"] = "STRING";
      /**Content is parsed as UTF8 JSON*/

      HttpClientParseMode["OBJECT"] = "OBJECT";
      /**Content is not interpreted, but available as a raw array of bytes*/

      HttpClientParseMode["BYTES"] = "BYTES";
    })(HttpClientParseMode || (HttpClientParseMode = {}));

    var LogLevel;

    (function (LogLevel) {
      /**All information usually needed by developers or administrators to help diagnose problems.*/
      LogLevel["DEBUG"] = "DEBUG";
      /**Something is wrong enough to compromise the correct processing of a request (for example a mandatory external resource, e.g. another HTTP server, is not responding)*/

      LogLevel["ERROR"] = "ERROR";
      /**Lowest level of traces. All service verbs at the TRACE level will dump all input and output. DO NOT enable TRACE unless you are prepared to go through a very high volume of logs. Enabling TRACE may degrade application performance.*/

      LogLevel["TRACE"] = "TRACE";
      /**Anything that can cause application misbehaviour, but that does not need human intervention.*/

      LogLevel["WARN"] = "WARN";
      /**Events meaningful for your application should go there : the creation of a user, a purchase, etc ...*/

      LogLevel["INFO"] = "INFO";
    })(LogLevel || (LogLevel = {}));

    var LogSinkType;

    (function (LogSinkType) {
      /**missing enum desc*/
      LogSinkType["TODO"] = "TODO";
      /**missing enum desc*/

      LogSinkType["INTERNAL"] = "INTERNAL";
      /**missing enum desc*/

      LogSinkType["REAL_TIME"] = "REAL_TIME";
    })(LogSinkType || (LogSinkType = {}));

    /**
     * Macros
     *
     * Macro-command service
     *  An admin defines macro-commands that can sequentially call any number of other api verbs, loop on collections of data, make decisions, etc
     *
     *
     *  End-users play them, with contextual parameters
     * */

    class Macro extends Service {
      /**
       * Get deployment type associated to Macro service
       * @return {string}
       */
      static get DEPLOYMENT_TYPE() {
        return 'macro';
      }
      /**
       * Get default deployment id associated to Macro service
       * @return {string}
       */


      static get DEFAULT_DEPLOYMENT_ID() {
        return 'macro_0';
      }
      /**
       * User API for macro debugging
       *
       * Debugger API for macro.
       * These API verbs are not intended for use by most developers.
       * @access public
       * */

      /**
       * Enables or disables a breakpoint
       *
       * @access public
       * */


      breakpoint(body) {
        this.$publish('breakpoint', body);
      }
      /**
       * Requests some information
       *
       * @access public
       * */


      info(body) {
        this.$publish('info', body);
      }
      /**
       * Debugs a previously recorded macro
       *
       * The given breakpoints will be honored, causing a suspension of the execution, resumable via 'resume'.
       * Only one debug session can be active at any given time.
       * @access public
       * */


      livedebug(body) {
        this.$publish('livedebug', body);
      }
      /**
       * Resumes a paused macro
       *
       * @access public
       * */


      resume(body) {
        this.$publish('resume', body);
      }
      /**
       * Sets a variable value
       *
       * @access public
       * */


      variable(body) {
        this.$publish('variable', body);
      }
      /**
       * User API for macro execution
       *
       * Simple errors are reported as usual.
       * However, the macro execution verbs treat most errors in a particular way : instead of reporting errors on the usual 'error' channel, errors are put in the returned 'MacroCompletion' result.
       * This behavior can be tuned on a per-call basis with the hardFail parameter.
       * Note that some particular errors will always behave as if hardFail were true, because they are related to programming errors, or prevent processing from ending gracefully : STACK_OVERFLOW, NO_SUCH_FUNCTION, RAM_EXCEEDED, CYCLES_EXCEEDED, TIME_EXCEEDED, QUOTA_EXCEEDED, RATE_EXCEEDED, BAD_COMPARATOR_VALUE
       * @access public
       * */

      /**
       * Plays a previously recorded macro
       *
       * DO NOT use this verb from inside an enclosing macro when you need the result in order to proceed with the enclosing macro.
       * You can override the default notification channel when defining the macro.
       * @access public
       * */


      call(body) {
        this.$publish('call', body);
      }
      /**
       * Evaluates a function result.
       *
       * @access public
       * */


      evaluate(body) {
        return this.$publish('evaluate', body);
      }
      /**
       * Plays a previously recorded macro and returns the result.
       *
       * Use this verb when you want to synchronously call a macro from inside another macro.
       * Despite being a server verb, func will honor the 'loud' modifier in ZMS.
       * @access public
       * */


      func(body) {
        return this.$publish('func', body);
      }
      /**
       * Returns the base HTTP URL for 'macro/exec' in this macro service.
       *
       * @access public
       * */


      getPublicHttpUrl() {
        return this.$publish('getPublicHttpUrl');
      }
      /**
       * Similar to func, with the ability to impersonate any user at will.
       *
       * Use this verb when you do not want to use or cannot use the standard rights system and wish to bypass it completely.
       * Use this verb sparingly, as it can give the caller any right on any resource.
       * @access public
       * */


      sudo(body) {
        return this.$publish('sudo', body);
      }

    }

    var MacroDebugStepType;

    (function (MacroDebugStepType) {
      /**Step over the next instruction*/
      MacroDebugStepType["STEP_OVER"] = "STEP_OVER";
      /**Resume execution*/

      MacroDebugStepType["RESUME"] = "RESUME";
      /**Terminate execution*/

      MacroDebugStepType["TERMINATE"] = "TERMINATE";
      /**Step into the next macrvo call*/

      MacroDebugStepType["STEP_INTO"] = "STEP_INTO";
    })(MacroDebugStepType || (MacroDebugStepType = {}));

    var TraceLevel;

    (function (TraceLevel) {
      /**Debug (server-generated traces are DEBUG)*/
      TraceLevel["DEBUG"] = "DEBUG";
      /**Currently unused*/

      TraceLevel["ERROR"] = "ERROR";
      /**From the 'trace' keyword*/

      TraceLevel["TRACE"] = "TRACE";
      /**Currently unused*/

      TraceLevel["WARN"] = "WARN";
      /**Currently unused*/

      TraceLevel["INFO"] = "INFO";
    })(TraceLevel || (TraceLevel = {}));

    var TraceType;

    (function (TraceType) {
      /**A macro is starting*/
      TraceType["MS"] = "MS";
      /**A macro has ended*/

      TraceType["ME"] = "ME";
      /**User comment*/

      TraceType["CMT"] = "CMT";
      /**Developer-generated*/

      TraceType["USR"] = "USR";
    })(TraceType || (TraceType = {}));

    var NotificationPlatform;

    (function (NotificationPlatform) {
      /**Apple*/
      NotificationPlatform["APNS"] = "APNS";
      /**Apple sandbox*/

      NotificationPlatform["APNS_VOIP_SANDBOX"] = "APNS_VOIP_SANDBOX";
      /**Apple VOIP sandbox*/

      NotificationPlatform["APNS_SANDBOX"] = "APNS_SANDBOX";
      /**Google Cloud Messaging*/

      NotificationPlatform["GCM"] = "GCM";
    })(NotificationPlatform || (NotificationPlatform = {}));

    /**
     * Producer consumer
     *
     * Producer consumer service
     *  Users can submit tasks and other users consume them
     * */

    class Queue extends Service {
      /**
       * Get deployment type associated to Queue service
       * @return {string}
       */
      static get DEPLOYMENT_TYPE() {
        return 'queue';
      }
      /**
       * Get default deployment id associated to Queue service
       * @return {string}
       */


      static get DEFAULT_DEPLOYMENT_ID() {
        return 'worker';
      }
      /**
       * Producer / consumer real-time API
       *
       * Task producers submits their tasks (by calling 'call' or 'submit').
       * The server dispatches the tasks, on a notification channel, which is often 'dispatch'.
       * Consumers process them and report completion back to the server on the 'done' channel.
       * Tasks are global to the service (i.e. NOT per user).
       * @access public
       * */

      /**
       * Submits a task
       *
       * Producer API.
       * A task producer submits the given task to the server.
       * The server will find a tasker with processing capacity and dispatch the task.
       * The task result will be returned to the caller.
       * When called from inside a macro, the consumer generated result is available for further use.
       * @access public
       * */


      call(body) {
        return this.$publish('call', body);
      }
      /**
       * Notifies completion of a task
       *
       * Consumer API.
       * The worker notifies completion of the given task to the server.
       * The worker can optionally include a result or an error code.
       * @access public
       * */


      done(body) {
        this.$publish('done', body);
      }
      /**
       * Reports progress for a task
       *
       * Consumer API.
       * A worker might call this API any number of times for a given taskId, between the start of the task and the call to 'done'.
       * Calling 'progress' is entirely optional and is just informative.
       * @access public
       * */


      progress(body) {
        this.$publish('progress', body);
      }
      /**
       * Registers a consumer
       *
       * Consumer API.
       * Registers the current user resource as an available task consumer.
       * Tasks will be then dispatched to that consumer.
       * IMPORTANT : after a disconnect and a new handshake, consumers must register again.
       * @access public
       * */


      register(body) {
        return this.$publish('register', body);
      }
      /**
       * Submits a task
       *
       * Producer API.
       * A task producer submits the given task to the server.
       * The server will find a tasker with processing capacity and dispatch the task.
       * The task result will be ignored : the producer will not receive any notification of any kind, even in case of errors (including capacity exceeded errors).
       * This verb will return immediately : you can use this API to asynchronously submit a task.
       * @access public
       * */


      submit(body) {
        this.$publish('submit', body);
      }
      /**
       * Unregisters a consumer
       *
       * Consumer API.
       * Unregisters the current user resource as an available task consumer.
       * All non finished tasks are returned to the server.
       * Consumers that disconnect from the STR will be automatically unregistered from this service.
       * @access public
       * */


      unregister() {
        this.$publish('unregister');
      }
      /**
       * Admin API when the queue service is used to provide server-side workers
       *
       * Task producers submits their tasks.
       * The server dispatches the tasks.
       * @access public
       * */

      /**
       * Makes several admin API calls at once.
       *
       * Calls are made sequentially in the given order.
       * There is no rollback if something goes wrong.
       * @access public
       * */


      admin(body) {
        return this.$publish('admin', body);
      }
      /**
       * Creates several services
       *
       * Configures missing services, restarts modified services.
       * Does not touch existing services with the same exact configuration.
       * There is no rollback if something goes wrong.
       * This cannot be used to redeploy the current service.
       * @access public
       * */


      createServices(body) {
        return this.$publish('createServices', body);
      }
      /**
       * Returns information about currently deployed app fragments.
       *
       * @access public
       * */


      getContext() {
        return this.$publish('getContext');
      }

    }

    /**
     * Local authentication
     *
     * Zetapush local authentication
     *  The configurer can choose the primary key and mandatory user fields for account creation
     *  The field 'zetapushKey' is generated by the server and MUST not be used : it contains the unique key of the user inside a sandbox (it can be obtained from inside a macro with the <b>__userKey</b> pseudo-constant)
     * */

    class Simple extends Service {
      /**
       * Get deployment type associated to Simple service
       * @return {string}
       */
      static get DEPLOYMENT_TYPE() {
        return 'simple';
      }
      /**
       * Get default deployment id associated to Simple service
       * @return {string}
       */


      static get DEFAULT_DEPLOYMENT_ID() {
        return 'simple_0';
      }
      /**
       * End-user API for the simple local authentication
       *
       * These API verbs allow end-users to manage their account(s).
       * @access public
       * */

      /**
       * Changes a password
       *
       * Changes a user password for this authentication realm.
       * The user can be either explicit, implicit (one of the current user's accounts) or deduced from the token.
       * You should provide at least one of 'key' and 'token'. If you do not, the server will try and find any key for the current user.
       * The change is effective immediately. However, already logged in users might stay connected.
       * The password and token fields are always null in the output.
       * @access public
       * */


      changePassword(body) {
        return this.$publish('changePassword', body);
      }
      /**
       * Checks some account's existence
       *
       * Checks whether the given account already exists in this 'simple' authentication realm.
       * This verb returns all the information about the user, including non public fields.
       * @access public
       * */


      checkAccount(body) {
        return this.$publish('checkAccount', body);
      }
      /**
       * Checks the password for the given account
       *
       * @access public
       * */


      checkPassword(body) {
        return this.$publish('checkPassword', body);
      }
      /**
       * Checks some account's existence
       *
       * Checks whether the given account already exists in this 'simple' authentication realm.
       * This verb returns all the information about the user, including non public fields.
       * @access public
       * */


      checkUser(body) {
        return this.$publish('checkUser', body);
      }
      /**
       * Creates an account
       *
       * Creates a new account in this 'simple' authentication realm.
       * Returns the account fields, including a field named <i>zetapushKey</i> containing the global user key of the user (value of the <b>__userKey</b> pseudo-constant when this new account will be used)
       * @access public
       * */


      createAccount(body) {
        return this.$publish('createAccount', body);
      }
      /**
       * Creates an account
       *
       * Creates a new account in this 'simple' authentication realm.
       * Returns a map of account fields, including a field named <i>zetapushKey</i> containing the global user key of the user (value of the <b>__userKey</b> pseudo-constant when this new account will be used)
       * @access public
       * */


      createUser(body) {
        return this.$publish('createUser', body);
      }
      /**
       * Lists an account's credentials
       *
       * Returns the list of account credentials in this service for the asking user.
       * Might return an empty list.
       * @access public
       * */


      credentials(body) {
        return this.$publish('credentials', body);
      }
      /**
       * Deletes an account
       *
       * Deletes an existing account in this 'simple' authentication realm.
       * @access public
       * */


      deleteUser(body) {
        return this.$publish('deleteUser', body);
      }
      /**
       * Requests a password reset
       *
       * Requests a password reset for the given unique account key.
       * The account key must exist and must be given, as it cannot obviously be deduced from the currently logged in user.
       * The returned token needs to be sent to the intended recipient only. The typical use case is to define a macro that requests a reset, generates a email template and emails the user. The macro can then be safely called by a weakly authenticated user.
       * Requesting a reset does not invalidate the password.
       * Requesting a reset again invalidates previous reset requests (only the last token is usable)
       * @access public
       * */


      requestReset(body) {
        return this.$publish('requestReset', body);
      }
      /**
       * Change some account's status
       *
       * Changes status if the given account already exists in this 'simple' authentication realm.
       * This verb returns all the information about the user, including non public fields.
       * @access public
       * */


      setStatus(body) {
        return this.$publish('setStatus', body);
      }
      /**
       * Updates an account
       *
       * Updates an existing account in this 'simple' authentication realm.
       * The configured login field MUST be given, as a user (identified by his zetapush userKey) might possess several accounts.
       * Returns the account fields
       * @access public
       * */


      updateAccount(body) {
        return this.$publish('updateAccount', body);
      }
      /**
       * Updates an account key
       *
       * Updates an existing account primary key (login, NOT <b>__userKey</b>) in this 'simple' authentication realm.
       * The updated account MUST belong to the user making the call.
       * The configured login field MUST be given, as a user (identified by his zetapush userKey) might possess several accounts.
       * Returns a map of account fields
       * @access public
       * */


      updateKey(body) {
        return this.$publish('updateKey', body);
      }
      /**
       * Updates an account
       *
       * Updates an existing account in this 'simple' authentication realm.
       * The updated account MUST belong to the user making the call.
       * The configured login field MUST be given, as a user (identified by his zetapush userKey) might possess several accounts.
       * Returns a map of account fields
       * @access public
       * */


      updateUser(body) {
        return this.$publish('updateUser', body);
      }

    }

    /**
     * Weak authentication
     *
     * The weak authentication allows for anonymous authentication of devices
     *  Such devices can display a qrcode to allow regular users to take control of them
     * */

    class Weak extends Service {
      /**
       * Get deployment type associated to Weak service
       * @return {string}
       */
      static get DEPLOYMENT_TYPE() {
        return 'weak';
      }
      /**
       * Get default deployment id associated to Weak service
       * @return {string}
       */


      static get DEFAULT_DEPLOYMENT_ID() {
        return 'weak_0';
      }
      /**
       * User API for weak devices control
       *
       * User API for control and release of weakly authenticated user sessions.
       * @access public
       * */

      /**
       * Controls a session
       *
       * Takes control of a weak user session, identified by the given public token.
       * The public token has been previously made available by the controlled device, for example by displaying a QRCode.
       * Upon control notification, the client SDK of the controlled session is expected to re-handshake.
       * @access public
       * */


      control(body) {
        return this.$publish('control', body);
      }
      /**
       * Returns the current token
       *
       * Returns your current session's private token. The token field may be null, if you did not log in with this authentication.
       * The token can be used to log in as the same weak user another time.
       * @access public
       * */


      getToken() {
        return this.$publish('getToken');
      }
      /**
       * Provisions accounts
       *
       * Provisions an arbitrary number of accounts.
       * The maximum number of accounts that you can create in one single call is configured per server.
       * @access public
       * */


      provision(body) {
        return this.$publish('provision', body);
      }
      /**
       * Releases a session
       *
       * Releases control of a weak user session, identified by the given public token.
       * The weak user session must have been previously controlled by a call to 'control'.
       * @access public
       * */


      release(body) {
        return this.$publish('release', body);
      }

    }

    /**
     * ZetaPush deployables names
     */

    const DeployableNames = {
      AUTH_DELEGATING: Delegating.DEPLOYMENT_TYPE,
      AUTH_DEVELOPER: 'developer',
      AUTH_SIMPLE: Simple.DEPLOYMENT_TYPE,
      AUTH_WEAK: Weak.DEPLOYMENT_TYPE
    };
    /**
     * Provide abstraction over CometD handshake data structure
     * @access protected
     */

    class AbstractHandshake {
      /**
       * Create a new handshake manager
       * @param {{authType: string, appName: string, deploymentId: string}} parameters
       */
      constructor({
        authType,
        appName,
        deploymentId
      }) {
        /**
         * @access protected
         * @type {string}
         */
        this.authType = authType;
        /**
         * @access protected
         * @type {string}
         */

        this.appName = appName;
        /**
         * @access protected
         * @type {string}
         */

        this.deploymentId = deploymentId;
      }
      /**
       * @param {ClientHelper} client
       * @return {Object}
       */


      getHandshakeFields(client) {
        const authentication = {
          data: this.authData,
          type: `${client.getAppName()}.${this.deploymentId}.${this.authType}`,
          version: this.authVersion
        };

        if (client.getResource()) {
          authentication.resource = client.getResource();
        }

        return {
          ext: {
            authentication
          }
        };
      }
      /**
       * Get auth version
       * @return {string}
       */


      get authVersion() {
        return 'none';
      }

    }
    /**
     * Provide abstraction over CometD token base handshake data structure
     * @access protected
     * @extends {AbstractHandshake}
     */


    class TokenHandshake extends AbstractHandshake {
      /**
       * @param {{authType: string, deploymentId: string, token: string}} parameters
       */
      constructor({
        authType,
        deploymentId,
        token
      }) {
        super({
          deploymentId,
          authType
        });
        /**
         * @access private
         * @type {string}
         */

        this.token = token;
      }
      /**
       * @return {token: string}
       */


      get authData() {
        const token = this.token;
        return {
          token
        };
      }

    }
    /**
     * Provide abstraction over CometD credentials based handshake data structure
     * @access protected
     * @extends {AbstractHandshake}
     */


    class CredentialsHandshake extends AbstractHandshake {
      /**
       * @param {{authType: string, deploymentId: string, login: string, password: string}} parameters
       */
      constructor({
        authType,
        deploymentId,
        login,
        password
      }) {
        super({
          authType,
          deploymentId
        });
        /**
         * @access private
         * @type {string}
         */

        this.login = login;
        /**
         * @access private
         * @type {string}
         */

        this.password = password;
      }
      /**
       * Get auth data
       * @return {login: string, password: string}
       */


      get authData() {
        const login = this.login,
              password = this.password;
        return {
          login,
          password
        };
      }

    }
    /**
     * Factory to create handshake
     * @access public
     */


    class Authentication {
      /**
       * @param {{deploymentId: string, login: string, password: string}} parameters
       * @return {CredentialsHandshake}
       * @example
       * // Explicit deploymentId
       * // Authentication provide optional deployment id, according to the following convention `${ServiceType.toLowerCase()_0}`
       * Authentication.delegating({
       *   deploymentId: '<YOUR-SIMPLE-AUTHENTICATION-DEPLOYMENT-ID>',
       *   login: <USER-LOGIN>,
       *   password: '<USER-PASSWORD>'
       * })
       */
      static simple({
        deploymentId = Simple.DEFAULT_DEPLOYMENT_ID,
        login,
        password
      }) {
        return Authentication.create({
          authType: DeployableNames.AUTH_SIMPLE,
          deploymentId,
          login,
          password
        });
      }
      /**
       * @param {{deploymentId: string, token: string}} parameters
       * @return {TokenHandshake}
       * @example
       * // Explicit deploymentId
       * // Authentication provide optional deployment id, according to the following convention `${ServiceType.toLowerCase()_0}`
       * Authentication.delegating({
       *   deploymentId: '<YOUR-WEAK-AUTHENTICATION-DEPLOYMENT-ID>',
       *   token: null
       * })
       */


      static weak({
        deploymentId = Weak.DEFAULT_DEPLOYMENT_ID,
        token
      }) {
        return Authentication.create({
          authType: DeployableNames.AUTH_WEAK,
          deploymentId,
          login: token,
          password: null
        });
      }
      /**
       * @param {{deploymentId: string, token: string}} parameters
       * @return {TokenHandshake}
       * @example
       * // Explicit deploymentId
       * // Authentication provide optional deployment id, according to the following convention `${ServiceType.toLowerCase()_0}`
       * Authentication.delegating({
       *   deploymentId: '<YOUR-DELEGATING-AUTHENTICATION-DEPLOYMENT-ID>',
       *   token: null
       * })
       */


      static delegating({
        deploymentId = Delegating.DEFAULT_DEPLOYMENT_ID,
        token
      }) {
        return Authentication.create({
          authType: DeployableNames.AUTH_DELEGATING,
          deploymentId,
          login: token,
          password: null
        });
      }

      static developer({
        login,
        password
      }) {
        return Authentication.create({
          authType: DeployableNames.AUTH_DEVELOPER,
          deploymentId: DeployableNames.AUTH_DEVELOPER,
          login,
          password
        });
      }
      /**
       * @param {{authType: string, deploymentId: string, login: string, password: string}} parameters
       * @return {TokenHandshake|CredentialsHandshake}
       */


      static create({
        authType,
        deploymentId,
        login,
        password
      }) {
        if (password === null) {
          return new TokenHandshake({
            authType,
            deploymentId,
            token: login
          });
        }

        return new CredentialsHandshake({
          authType,
          deploymentId,
          login,
          password
        });
      }

    }

    /**
     * Define life cycle connection methods
     * @access public
     */
    class ConnectionStatusListener {
      /**
       * Callback fired when connection is broken
       */
      onConnectionBroken() {}
      /**
       * Callback fired when connection is closed
       */


      onConnectionClosed() {}
      /**
       * Callback fired when connection is established
       */


      onConnectionEstablished() {}
      /**
       * Callback fired when an error occurs in connection to server step
       * @param {Object} failure
       */


      onConnectionToServerFail(failure) {}
      /**
       * Callback fired when negociation with server failed
       * @param {Object} failure
       */


      onNegotiationFailed(failure) {}
      /**
       * Callback no server url avaibale
       */


      onNoServerUrlAvailable() {}
      /**
       * Callback fired when connection will close
       */


      onConnectionWillClose() {}
      /**
       * Callback fired when an error occurs in handshake step
       * @param {Object} failure
       */


      onFailedHandshake(failure) {}
      /**
       * Callback fired when a message is lost
       */


      onMessageLost() {}
      /**
       * Callback fired when handshake step succeed
       * @param {Object} authentication
       */


      onSuccessfulHandshake(authentication) {}

    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);

        if (typeof Object.getOwnPropertySymbols === 'function') {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }

        ownKeys.forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      }

      return target;
    }

    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;

      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }

      return target;
    }

    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};

      var target = _objectWithoutPropertiesLoose(source, excluded);

      var key, i;

      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }

      return target;
    }

    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
    }

    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }

    function _iterableToArrayLimit(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }

    /**
     * A registry for transports used by the CometD object.
     */
    var TransportRegistry = function TransportRegistry() {
      var _types = [];
      var _transports = {};

      this.getTransportTypes = function () {
        return _types.slice(0);
      };

      this.findTransportTypes = function (version, crossDomain, url) {
        var result = [];

        for (var i = 0; i < _types.length; ++i) {
          var type = _types[i];

          if (_transports[type].accept(version, crossDomain, url) === true) {
            result.push(type);
          }
        }

        return result;
      };

      this.negotiateTransport = function (types, version, crossDomain, url) {
        for (var i = 0; i < _types.length; ++i) {
          var type = _types[i];

          for (var j = 0; j < types.length; ++j) {
            if (type === types[j]) {
              var transport = _transports[type];

              if (transport.accept(version, crossDomain, url) === true) {
                return transport;
              }
            }
          }
        }

        return null;
      };

      this.add = function (type, transport, index) {
        var existing = false;

        for (var i = 0; i < _types.length; ++i) {
          if (_types[i] === type) {
            existing = true;
            break;
          }
        }

        if (!existing) {
          if (typeof index !== 'number') {
            _types.push(type);
          } else {
            _types.splice(index, 0, type);
          }

          _transports[type] = transport;
        }

        return !existing;
      };

      this.find = function (type) {
        for (var i = 0; i < _types.length; ++i) {
          if (_types[i] === type) {
            return _transports[type];
          }
        }

        return null;
      };

      this.remove = function (type) {
        for (var i = 0; i < _types.length; ++i) {
          if (_types[i] === type) {
            _types.splice(i, 1);

            var transport = _transports[type];
            delete _transports[type];
            return transport;
          }
        }

        return null;
      };

      this.clear = function () {
        _types = [];
        _transports = {};
      };

      this.reset = function (init) {
        for (var i = 0; i < _types.length; ++i) {
          _transports[_types[i]].reset(init);
        }
      };
    };

    var isString = function (value) {
      if (value === undefined || value === null) {
        return false;
      }

      return typeof value === 'string' || value instanceof String;
    };

    var isArray = function (value) {
      if (value === undefined || value === null) {
        return false;
      }

      return value instanceof Array;
    };
    /**
     * Returns whether the given element is contained into the given array.
     * @param element the element to check presence for
     * @param array the array to check for the element presence
     * @return the index of the element, if present, or a negative index if the element is not present
     */


    var inArray = function (element, array) {
      for (var i = 0; i < array.length; ++i) {
        if (element === array[i]) {
          return i;
        }
      }

      return -1;
    };

    var setTimeout_1 = function (cometd, funktion, delay) {
      return setTimeout(function () {
        try {
          cometd._debug('Invoking timed function', funktion);

          funktion();
        } catch (x) {
          cometd._debug('Exception invoking timed function', funktion, x);
        }
      }, delay);
    };

    var clearTimeout_1 = function (timeoutHandle) {
      clearTimeout(timeoutHandle);
    };

    var Utils = {
      isString: isString,
      isArray: isArray,
      inArray: inArray,
      setTimeout: setTimeout_1,
      clearTimeout: clearTimeout_1
    };

    /**
     * The constructor for a CometD object, identified by an optional name.
     * The default name is the string 'default'.
     * In the rare case a page needs more than one Bayeux conversation,
     * a new instance can be created via:
     * <pre>
     * var bayeuxUrl2 = ...;
     *
     * // Dojo style
     * var cometd2 = new dojox.CometD('another_optional_name');
     *
     * // jQuery style
     * var cometd2 = new $.CometD('another_optional_name');
     *
     * cometd2.init({url: bayeuxUrl2});
     * </pre>
     * @param name the optional name of this cometd object
     */

    var CometD = function CometD(name) {
      var _cometd = this;

      var _name = name || 'default';

      var _crossDomain = false;

      var _transports = new TransportRegistry();

      var _transport;

      var _status = 'disconnected';
      var _messageId = 0;
      var _clientId = null;
      var _batch = 0;
      var _messageQueue = [];
      var _internalBatch = false;
      var _listeners = {};
      var _backoff = 0;
      var _scheduledSend = null;
      var _extensions = [];
      var _advice = {};

      var _handshakeProps;

      var _handshakeCallback;

      var _callbacks = {};
      var _remoteCalls = {};
      var _reestablish = false;
      var _connected = false;
      var _handshakeMessages = 0;
      var _config = {
        protocol: null,
        stickyReconnect: true,
        connectTimeout: 0,
        maxConnections: 2,
        backoffIncrement: 1000,
        maxBackoff: 60000,
        logLevel: 'info',
        reverseIncomingExtensions: true,
        maxNetworkDelay: 10000,
        requestHeaders: {},
        appendMessageTypeToURL: true,
        autoBatch: false,
        urls: {},
        maxURILength: 2000,
        advice: {
          timeout: 60000,
          interval: 0,
          reconnect: 'retry',
          maxInterval: 0
        }
      };

      function _fieldValue(object, name) {
        try {
          return object[name];
        } catch (x) {
          return undefined;
        }
      }
      /**
       * Mixes in the given objects into the target object by copying the properties.
       * @param deep if the copy must be deep
       * @param target the target object
       * @param objects the objects whose properties are copied into the target
       */


      this._mixin = function (deep, target, objects) {
        var result = target || {}; // Skip first 2 parameters (deep and target), and loop over the others

        for (var i = 2; i < arguments.length; ++i) {
          var object = arguments[i];

          if (object === undefined || object === null) {
            continue;
          }

          for (var propName in object) {
            if (object.hasOwnProperty(propName)) {
              var prop = _fieldValue(object, propName);

              var targ = _fieldValue(result, propName); // Avoid infinite loops


              if (prop === target) {
                continue;
              } // Do not mixin undefined values


              if (prop === undefined) {
                continue;
              }

              if (deep && typeof prop === 'object' && prop !== null) {
                if (prop instanceof Array) {
                  result[propName] = this._mixin(deep, targ instanceof Array ? targ : [], prop);
                } else {
                  var source = typeof targ === 'object' && !(targ instanceof Array) ? targ : {};
                  result[propName] = this._mixin(deep, source, prop);
                }
              } else {
                result[propName] = prop;
              }
            }
          }
        }

        return result;
      };

      function _isString(value) {
        return Utils.isString(value);
      }

      function _isFunction(value) {
        if (value === undefined || value === null) {
          return false;
        }

        return typeof value === 'function';
      }

      function _zeroPad(value, length) {
        var result = '';

        while (--length > 0) {
          if (value >= Math.pow(10, length)) {
            break;
          }

          result += '0';
        }

        result += value;
        return result;
      }

      function _log(level, args) {
        if ('undefined' !== typeof console) {
          var logger = console[level];

          if (_isFunction(logger)) {
            var now = new Date();
            [].splice.call(args, 0, 0, _zeroPad(now.getHours(), 2) + ':' + _zeroPad(now.getMinutes(), 2) + ':' + _zeroPad(now.getSeconds(), 2) + '.' + _zeroPad(now.getMilliseconds(), 3));
            logger.apply(console, args);
          }
        }
      }

      this._warn = function () {
        _log('warn', arguments);
      };

      this._info = function () {
        if (_config.logLevel !== 'warn') {
          _log('info', arguments);
        }
      };

      this._debug = function () {
        if (_config.logLevel === 'debug') {
          _log('debug', arguments);
        }
      };

      function _splitURL(url) {
        // [1] = protocol://,
        // [2] = host:port,
        // [3] = host,
        // [4] = IPv6_host,
        // [5] = IPv4_host,
        // [6] = :port,
        // [7] = port,
        // [8] = uri,
        // [9] = rest (query / fragment)
        return /(^https?:\/\/)?(((\[[^\]]+\])|([^:\/\?#]+))(:(\d+))?)?([^\?#]*)(.*)?/.exec(url);
      }
      /**
       * Returns whether the given hostAndPort is cross domain.
       * The default implementation checks against window.location.host
       * but this function can be overridden to make it work in non-browser
       * environments.
       *
       * @param hostAndPort the host and port in format host:port
       * @return whether the given hostAndPort is cross domain
       */


      this._isCrossDomain = function (hostAndPort) {
        var host = typeof location === 'undefined' ? hostAndPort : location.host;
        return hostAndPort && hostAndPort !== host;
      };

      function _configure(configuration) {
        _cometd._debug('Configuring cometd object with', configuration); // Support old style param, where only the Bayeux server URL was passed


        if (_isString(configuration)) {
          configuration = {
            url: configuration
          };
        }

        if (!configuration) {
          configuration = {};
        }

        _config = _cometd._mixin(false, _config, configuration);

        var url = _cometd.getURL();

        if (!url) {
          throw 'Missing required configuration parameter \'url\' specifying the Bayeux server URL';
        } // Check if we're cross domain.


        var urlParts = _splitURL(url);

        var hostAndPort = urlParts[2];
        var uri = urlParts[8];
        var afterURI = urlParts[9];
        _crossDomain = _cometd._isCrossDomain(hostAndPort); // Check if appending extra path is supported

        if (_config.appendMessageTypeToURL) {
          if (afterURI !== undefined && afterURI.length > 0) {
            _cometd._info('Appending message type to URI ' + uri + afterURI + ' is not supported, disabling \'appendMessageTypeToURL\' configuration');

            _config.appendMessageTypeToURL = false;
          } else {
            var uriSegments = uri.split('/');
            var lastSegmentIndex = uriSegments.length - 1;

            if (uri.match(/\/$/)) {
              lastSegmentIndex -= 1;
            }

            if (uriSegments[lastSegmentIndex].indexOf('.') >= 0) {
              // Very likely the CometD servlet's URL pattern is mapped to an extension, such as *.cometd
              // It will be difficult to add the extra path in this case
              _cometd._info('Appending message type to URI ' + uri + ' is not supported, disabling \'appendMessageTypeToURL\' configuration');

              _config.appendMessageTypeToURL = false;
            }
          }
        }
      }

      function _removeListener(subscription) {
        if (subscription) {
          var subscriptions = _listeners[subscription.channel];

          if (subscriptions && subscriptions[subscription.id]) {
            delete subscriptions[subscription.id];

            _cometd._debug('Removed', subscription.listener ? 'listener' : 'subscription', subscription);
          }
        }
      }

      function _removeSubscription(subscription) {
        if (subscription && !subscription.listener) {
          _removeListener(subscription);
        }
      }

      function _clearSubscriptions() {
        for (var channel in _listeners) {
          if (_listeners.hasOwnProperty(channel)) {
            var subscriptions = _listeners[channel];

            if (subscriptions) {
              for (var i = 0; i < subscriptions.length; ++i) {
                _removeSubscription(subscriptions[i]);
              }
            }
          }
        }
      }

      function _setStatus(newStatus) {
        if (_status !== newStatus) {
          _cometd._debug('Status', _status, '->', newStatus);

          _status = newStatus;
        }
      }

      function _isDisconnected() {
        return _status === 'disconnecting' || _status === 'disconnected';
      }

      function _nextMessageId() {
        var result = ++_messageId;
        return '' + result;
      }

      function _applyExtension(scope, callback, name, message, outgoing) {
        try {
          return callback.call(scope, message);
        } catch (x) {
          var handler = _cometd.onExtensionException;

          if (_isFunction(handler)) {
            _cometd._debug('Invoking extension exception handler', name, x);

            try {
              handler.call(_cometd, x, name, outgoing, message);
            } catch (xx) {
              _cometd._info('Exception during execution of extension exception handler', name, xx);
            }
          } else {
            _cometd._info('Exception during execution of extension', name, x);
          }

          return message;
        }
      }

      function _applyIncomingExtensions(message) {
        for (var i = 0; i < _extensions.length; ++i) {
          if (message === undefined || message === null) {
            break;
          }

          var index = _config.reverseIncomingExtensions ? _extensions.length - 1 - i : i;
          var extension = _extensions[index];
          var callback = extension.extension.incoming;

          if (_isFunction(callback)) {
            var result = _applyExtension(extension.extension, callback, extension.name, message, false);

            message = result === undefined ? message : result;
          }
        }

        return message;
      }

      function _applyOutgoingExtensions(message) {
        for (var i = 0; i < _extensions.length; ++i) {
          if (message === undefined || message === null) {
            break;
          }

          var extension = _extensions[i];
          var callback = extension.extension.outgoing;

          if (_isFunction(callback)) {
            var result = _applyExtension(extension.extension, callback, extension.name, message, true);

            message = result === undefined ? message : result;
          }
        }

        return message;
      }

      function _notify(channel, message) {
        var subscriptions = _listeners[channel];

        if (subscriptions && subscriptions.length > 0) {
          for (var i = 0; i < subscriptions.length; ++i) {
            var subscription = subscriptions[i]; // Subscriptions may come and go, so the array may have 'holes'

            if (subscription) {
              try {
                subscription.callback.call(subscription.scope, message);
              } catch (x) {
                var handler = _cometd.onListenerException;

                if (_isFunction(handler)) {
                  _cometd._debug('Invoking listener exception handler', subscription, x);

                  try {
                    handler.call(_cometd, x, subscription, subscription.listener, message);
                  } catch (xx) {
                    _cometd._info('Exception during execution of listener exception handler', subscription, xx);
                  }
                } else {
                  _cometd._info('Exception during execution of listener', subscription, message, x);
                }
              }
            }
          }
        }
      }

      function _notifyListeners(channel, message) {
        // Notify direct listeners
        _notify(channel, message); // Notify the globbing listeners


        var channelParts = channel.split('/');
        var last = channelParts.length - 1;

        for (var i = last; i > 0; --i) {
          var channelPart = channelParts.slice(0, i).join('/') + '/*'; // We don't want to notify /foo/* if the channel is /foo/bar/baz,
          // so we stop at the first non recursive globbing

          if (i === last) {
            _notify(channelPart, message);
          } // Add the recursive globber and notify


          channelPart += '*';

          _notify(channelPart, message);
        }
      }

      function _cancelDelayedSend() {
        if (_scheduledSend !== null) {
          Utils.clearTimeout(_scheduledSend);
        }

        _scheduledSend = null;
      }

      function _delayedSend(operation, delay) {
        if ('undefined' === typeof delay) {
          delay = _backoff;
        }

        _cancelDelayedSend();

        var time = _advice.interval + delay;

        _cometd._debug('Function scheduled in', time, 'ms, interval =', _advice.interval, 'backoff =', _backoff, operation);

        _scheduledSend = Utils.setTimeout(_cometd, operation, time);
      } // Needed to break cyclic dependencies between function definitions


      var _handleMessages;

      var _handleFailure;
      /**
       * Delivers the messages to the CometD server
       * @param sync whether the send is synchronous
       * @param messages the array of messages to send
       * @param metaConnect true if this send is on /meta/connect
       * @param extraPath an extra path to append to the Bayeux server URL
       */


      function _send(sync, messages, metaConnect, extraPath) {
        // We must be sure that the messages have a clientId.
        // This is not guaranteed since the handshake may take time to return
        // (and hence the clientId is not known yet) and the application
        // may create other messages.
        for (var i = 0; i < messages.length; ++i) {
          var message = messages[i];
          var messageId = message.id;

          if (_clientId) {
            message.clientId = _clientId;
          }

          message = _applyOutgoingExtensions(message);

          if (message !== undefined && message !== null) {
            // Extensions may have modified the message id, but we need to own it.
            message.id = messageId;
            messages[i] = message;
          } else {
            delete _callbacks[messageId];
            messages.splice(i--, 1);
          }
        }

        if (messages.length === 0) {
          return;
        }

        var url = _cometd.getURL();

        if (_config.appendMessageTypeToURL) {
          // If url does not end with '/', then append it
          if (!url.match(/\/$/)) {
            url = url + '/';
          }

          if (extraPath) {
            url = url + extraPath;
          }
        }

        var envelope = {
          url: url,
          sync: sync,
          messages: messages,
          onSuccess: function (rcvdMessages) {
            try {
              _handleMessages.call(_cometd, rcvdMessages);
            } catch (x) {
              _cometd._info('Exception during handling of messages', x);
            }
          },
          onFailure: function (conduit, messages, failure) {
            try {
              var transport = _cometd.getTransport();

              failure.connectionType = transport ? transport.getType() : "unknown";

              _handleFailure.call(_cometd, conduit, messages, failure);
            } catch (x) {
              _cometd._info('Exception during handling of failure', x);
            }
          }
        };

        _cometd._debug('Send', envelope);

        _transport.send(envelope, metaConnect);
      }

      function _queueSend(message) {
        if (_batch > 0 || _internalBatch === true) {
          _messageQueue.push(message);
        } else {
          _send(false, [message], false);
        }
      }
      /**
       * Sends a complete bayeux message.
       * This method is exposed as a public so that extensions may use it
       * to send bayeux message directly, for example in case of re-sending
       * messages that have already been sent but that for some reason must
       * be resent.
       */


      this.send = _queueSend;

      function _resetBackoff() {
        _backoff = 0;
      }

      function _increaseBackoff() {
        if (_backoff < _config.maxBackoff) {
          _backoff += _config.backoffIncrement;
        }

        return _backoff;
      }
      /**
       * Starts a the batch of messages to be sent in a single request.
       * @see #_endBatch(sendMessages)
       */


      function _startBatch() {
        ++_batch;

        _cometd._debug('Starting batch, depth', _batch);
      }

      function _flushBatch() {
        var messages = _messageQueue;
        _messageQueue = [];

        if (messages.length > 0) {
          _send(false, messages, false);
        }
      }
      /**
       * Ends the batch of messages to be sent in a single request,
       * optionally sending messages present in the message queue depending
       * on the given argument.
       * @see #_startBatch()
       */


      function _endBatch() {
        --_batch;

        _cometd._debug('Ending batch, depth', _batch);

        if (_batch < 0) {
          throw 'Calls to startBatch() and endBatch() are not paired';
        }

        if (_batch === 0 && !_isDisconnected() && !_internalBatch) {
          _flushBatch();
        }
      }
      /**
       * Sends the connect message
       */


      function _connect() {
        if (!_isDisconnected()) {
          var bayeuxMessage = {
            id: _nextMessageId(),
            channel: '/meta/connect',
            connectionType: _transport.getType()
          }; // In case of reload or temporary loss of connection
          // we want the next successful connect to return immediately
          // instead of being held by the server, so that connect listeners
          // can be notified that the connection has been re-established

          if (!_connected) {
            bayeuxMessage.advice = {
              timeout: 0
            };
          }

          _setStatus('connecting');

          _cometd._debug('Connect sent', bayeuxMessage);

          _send(false, [bayeuxMessage], true, 'connect');

          _setStatus('connected');
        }
      }

      function _delayedConnect(delay) {
        _setStatus('connecting');

        _delayedSend(function () {
          _connect();
        }, delay);
      }

      function _updateAdvice(newAdvice) {
        if (newAdvice) {
          _advice = _cometd._mixin(false, {}, _config.advice, newAdvice);

          _cometd._debug('New advice', _advice);
        }
      }

      function _disconnect(abort) {
        _cancelDelayedSend();

        if (abort && _transport) {
          _transport.abort();
        }

        _clientId = null;

        _setStatus('disconnected');

        _batch = 0;

        _resetBackoff();

        _transport = null; // Fail any existing queued message

        if (_messageQueue.length > 0) {
          var messages = _messageQueue;
          _messageQueue = [];

          _handleFailure.call(_cometd, undefined, messages, {
            reason: 'Disconnected'
          });
        }
      }

      function _notifyTransportFailure(oldTransport, newTransport, failure) {
        var handler = _cometd.onTransportException;

        if (_isFunction(handler)) {
          _cometd._debug('Invoking transport exception handler', oldTransport, newTransport, failure);

          try {
            handler.call(_cometd, failure, oldTransport, newTransport);
          } catch (x) {
            _cometd._info('Exception during execution of transport exception handler', x);
          }
        }
      }
      /**
       * Sends the initial handshake message
       */


      function _handshake(handshakeProps, handshakeCallback) {
        if (_isFunction(handshakeProps)) {
          handshakeCallback = handshakeProps;
          handshakeProps = undefined;
        }

        _clientId = null;

        _clearSubscriptions(); // Reset the transports if we're not retrying the handshake


        if (_isDisconnected()) {
          _transports.reset(true);

          _updateAdvice(_config.advice);
        } else {
          // We are retrying the handshake, either because another handshake failed
          // and we're backing off, or because the server timed us out and asks us to
          // re-handshake: in both cases, make sure that if the handshake succeeds
          // the next action is a connect.
          _updateAdvice(_cometd._mixin(false, _advice, {
            reconnect: 'retry'
          }));
        }

        _batch = 0; // Mark the start of an internal batch.
        // This is needed because handshake and connect are async.
        // It may happen that the application calls init() then subscribe()
        // and the subscribe message is sent before the connect message, if
        // the subscribe message is not held until the connect message is sent.
        // So here we start a batch to hold temporarily any message until
        // the connection is fully established.

        _internalBatch = true; // Save the properties provided by the user, so that
        // we can reuse them during automatic re-handshake

        _handshakeProps = handshakeProps;
        _handshakeCallback = handshakeCallback;
        var version = '1.0'; // Figure out the transports to send to the server

        var url = _cometd.getURL();

        var transportTypes = _transports.findTransportTypes(version, _crossDomain, url);

        var bayeuxMessage = {
          id: _nextMessageId(),
          version: version,
          minimumVersion: version,
          channel: '/meta/handshake',
          supportedConnectionTypes: transportTypes,
          advice: {
            timeout: _advice.timeout,
            interval: _advice.interval
          }
        }; // Do not allow the user to override important fields.

        var message = _cometd._mixin(false, {}, _handshakeProps, bayeuxMessage); // Save the callback.


        _cometd._putCallback(message.id, handshakeCallback); // Pick up the first available transport as initial transport
        // since we don't know if the server supports it


        if (!_transport) {
          _transport = _transports.negotiateTransport(transportTypes, version, _crossDomain, url);

          if (!_transport) {
            var failure = 'Could not find initial transport among: ' + _transports.getTransportTypes();

            _cometd._warn(failure);

            throw failure;
          }
        }

        _cometd._debug('Initial transport is', _transport.getType()); // We started a batch to hold the application messages,
        // so here we must bypass it and send immediately.


        _setStatus('handshaking');

        _cometd._debug('Handshake sent', message);

        _send(false, [message], false, 'handshake');
      }

      function _delayedHandshake(delay) {
        _setStatus('handshaking'); // We will call _handshake() which will reset _clientId, but we want to avoid
        // that between the end of this method and the call to _handshake() someone may
        // call publish() (or other methods that call _queueSend()).


        _internalBatch = true;

        _delayedSend(function () {
          _handshake(_handshakeProps, _handshakeCallback);
        }, delay);
      }

      function _notifyCallback(callback, message) {
        try {
          callback.call(_cometd, message);
        } catch (x) {
          var handler = _cometd.onCallbackException;

          if (_isFunction(handler)) {
            _cometd._debug('Invoking callback exception handler', x);

            try {
              handler.call(_cometd, x, message);
            } catch (xx) {
              _cometd._info('Exception during execution of callback exception handler', xx);
            }
          } else {
            _cometd._info('Exception during execution of message callback', x);
          }
        }
      }

      this._getCallback = function (messageId) {
        return _callbacks[messageId];
      };

      this._putCallback = function (messageId, callback) {
        var result = this._getCallback(messageId);

        if (_isFunction(callback)) {
          _callbacks[messageId] = callback;
        }

        return result;
      };

      function _handleCallback(message) {
        var callback = _cometd._getCallback([message.id]);

        if (_isFunction(callback)) {
          delete _callbacks[message.id];

          _notifyCallback(callback, message);
        }
      }

      function _handleRemoteCall(message) {
        var context = _remoteCalls[message.id];
        delete _remoteCalls[message.id];

        _cometd._debug('Handling remote call response for', message, 'with context', context);

        if (context) {
          // Clear the timeout, if present.
          var timeout = context.timeout;

          if (timeout) {
            Utils.clearTimeout(timeout);
          }

          var callback = context.callback;

          if (_isFunction(callback)) {
            _notifyCallback(callback, message);

            return true;
          }
        }

        return false;
      }

      function _failHandshake(message) {
        _handleCallback(message);

        _notifyListeners('/meta/handshake', message);

        _notifyListeners('/meta/unsuccessful', message); // Only try again if we haven't been disconnected and
        // the advice permits us to retry the handshake


        var retry = !_isDisconnected() && _advice.reconnect !== 'none';

        if (retry) {
          _increaseBackoff();

          _delayedHandshake();
        } else {
          _disconnect(true);
        }
      }

      function _handshakeResponse(message) {
        if (message.successful) {
          // Save clientId, figure out transport, then follow the advice to connect
          _clientId = message.clientId;

          var url = _cometd.getURL();

          var newTransport = _transports.negotiateTransport(message.supportedConnectionTypes, message.version, _crossDomain, url);

          if (newTransport === null) {
            var failure = 'Could not negotiate transport with server; client=[' + _transports.findTransportTypes(message.version, _crossDomain, url) + '], server=[' + message.supportedConnectionTypes + ']';

            var oldTransport = _cometd.getTransport();

            _notifyTransportFailure(oldTransport.getType(), null, {
              reason: failure,
              connectionType: oldTransport.getType(),
              transport: oldTransport
            });

            _cometd._warn(failure);

            _disconnect(true);

            return;
          } else if (_transport !== newTransport) {
            _cometd._debug('Transport', _transport.getType(), '->', newTransport.getType());

            _transport = newTransport;
          } // End the internal batch and allow held messages from the application
          // to go to the server (see _handshake() where we start the internal batch).


          _internalBatch = false;

          _flushBatch(); // Here the new transport is in place, as well as the clientId, so
          // the listeners can perform a publish() if they want.
          // Notify the listeners before the connect below.


          message.reestablish = _reestablish;
          _reestablish = true;

          _handleCallback(message);

          _notifyListeners('/meta/handshake', message);

          var action = _isDisconnected() ? 'none' : _advice.reconnect;

          switch (action) {
            case 'retry':
              _resetBackoff();

              _delayedConnect();

              break;

            case 'none':
              _disconnect(true);

              break;

            default:
              throw 'Unrecognized advice action ' + action;
          }
        } else {
          _failHandshake(message);
        }
      }

      function _handshakeFailure(message) {
        var version = '1.0';

        var url = _cometd.getURL();

        var oldTransport = _cometd.getTransport();

        var transportTypes = _transports.findTransportTypes(version, _crossDomain, url);

        var newTransport = _transports.negotiateTransport(transportTypes, version, _crossDomain, url);

        if (!newTransport) {
          _notifyTransportFailure(oldTransport.getType(), null, message.failure);

          _cometd._warn('Could not negotiate transport; client=[' + transportTypes + ']');

          _disconnect(true);

          _failHandshake(message);
        } else {
          _cometd._debug('Transport', oldTransport.getType(), '->', newTransport.getType());

          _notifyTransportFailure(oldTransport.getType(), newTransport.getType(), message.failure);

          _failHandshake(message);

          _transport = newTransport;
        }
      }

      function _failConnect(message) {
        // Notify the listeners after the status change but before the next action
        _notifyListeners('/meta/connect', message);

        _notifyListeners('/meta/unsuccessful', message); // This may happen when the server crashed, the current clientId
        // will be invalid, and the server will ask to handshake again
        // Listeners can call disconnect(), so check the state after they run


        var action = _isDisconnected() ? 'none' : _advice.reconnect;

        switch (action) {
          case 'retry':
            _delayedConnect();

            _increaseBackoff();

            break;

          case 'handshake':
            // The current transport may be failed (e.g. network disconnection)
            // Reset the transports so the new handshake picks up the right one
            _transports.reset(true);

            _resetBackoff();

            _delayedHandshake();

            break;

          case 'none':
            _disconnect(true);

            break;

          default:
            throw 'Unrecognized advice action' + action;
        }
      }

      function _connectResponse(message) {
        _connected = message.successful;

        if (_connected) {
          _notifyListeners('/meta/connect', message); // Normally, the advice will say "reconnect: 'retry', interval: 0"
          // and the server will hold the request, so when a response returns
          // we immediately call the server again (long polling)
          // Listeners can call disconnect(), so check the state after they run


          var action = _isDisconnected() ? 'none' : _advice.reconnect;

          switch (action) {
            case 'retry':
              _resetBackoff();

              _delayedConnect();

              break;

            case 'none':
              // Wait for the /meta/disconnect to arrive.
              _disconnect(false);

              break;

            default:
              throw 'Unrecognized advice action ' + action;
          }
        } else {
          _failConnect(message);
        }
      }

      function _connectFailure(message) {
        _connected = false;

        _failConnect(message);
      }

      function _failDisconnect(message) {
        _disconnect(true);

        _handleCallback(message);

        _notifyListeners('/meta/disconnect', message);

        _notifyListeners('/meta/unsuccessful', message);
      }

      function _disconnectResponse(message) {
        if (message.successful) {
          // Wait for the /meta/connect to arrive.
          _disconnect(false);

          _handleCallback(message);

          _notifyListeners('/meta/disconnect', message);
        } else {
          _failDisconnect(message);
        }
      }

      function _disconnectFailure(message) {
        _failDisconnect(message);
      }

      function _failSubscribe(message) {
        var subscriptions = _listeners[message.subscription];

        if (subscriptions) {
          for (var i = subscriptions.length - 1; i >= 0; --i) {
            var subscription = subscriptions[i];

            if (subscription && !subscription.listener) {
              delete subscriptions[i];

              _cometd._debug('Removed failed subscription', subscription);

              break;
            }
          }
        }

        _handleCallback(message);

        _notifyListeners('/meta/subscribe', message);

        _notifyListeners('/meta/unsuccessful', message);
      }

      function _subscribeResponse(message) {
        if (message.successful) {
          _handleCallback(message);

          _notifyListeners('/meta/subscribe', message);
        } else {
          _failSubscribe(message);
        }
      }

      function _subscribeFailure(message) {
        _failSubscribe(message);
      }

      function _failUnsubscribe(message) {
        _handleCallback(message);

        _notifyListeners('/meta/unsubscribe', message);

        _notifyListeners('/meta/unsuccessful', message);
      }

      function _unsubscribeResponse(message) {
        if (message.successful) {
          _handleCallback(message);

          _notifyListeners('/meta/unsubscribe', message);
        } else {
          _failUnsubscribe(message);
        }
      }

      function _unsubscribeFailure(message) {
        _failUnsubscribe(message);
      }

      function _failMessage(message) {
        if (!_handleRemoteCall(message)) {
          _handleCallback(message);

          _notifyListeners('/meta/publish', message);

          _notifyListeners('/meta/unsuccessful', message);
        }
      }

      function _messageResponse(message) {
        if (message.data !== undefined) {
          if (!_handleRemoteCall(message)) {
            _notifyListeners(message.channel, message);

            if (_handshakeMessages > 0) {
              --_handshakeMessages;

              if (_handshakeMessages === 0) {
                _cometd._debug('Processed last handshake-delivered message');

                _delayedConnect(0);
              }
            }
          }
        } else {
          if (message.successful === undefined) {
            _cometd._warn('Unknown Bayeux Message', message);
          } else {
            if (message.successful) {
              _handleCallback(message);

              _notifyListeners('/meta/publish', message);
            } else {
              _failMessage(message);
            }
          }
        }
      }

      function _messageFailure(failure) {
        _failMessage(failure);
      }

      function _receive(message) {
        message = _applyIncomingExtensions(message);

        if (message === undefined || message === null) {
          return;
        }

        _updateAdvice(message.advice);

        var channel = message.channel;

        switch (channel) {
          case '/meta/handshake':
            _handshakeResponse(message);

            break;

          case '/meta/connect':
            _connectResponse(message);

            break;

          case '/meta/disconnect':
            _disconnectResponse(message);

            break;

          case '/meta/subscribe':
            _subscribeResponse(message);

            break;

          case '/meta/unsubscribe':
            _unsubscribeResponse(message);

            break;

          default:
            _messageResponse(message);

            break;
        }
      }
      /**
       * Receives a message.
       * This method is exposed as a public so that extensions may inject
       * messages simulating that they had been received.
       */


      this.receive = _receive;

      _handleMessages = function (rcvdMessages) {
        _cometd._debug('Received', rcvdMessages);

        for (var i = 0; i < rcvdMessages.length; ++i) {
          var message = rcvdMessages[i];

          _receive(message);
        }
      };

      _handleFailure = function (conduit, messages, failure) {
        _cometd._debug('handleFailure', conduit, messages, failure);

        failure.transport = conduit;

        for (var i = 0; i < messages.length; ++i) {
          var message = messages[i];
          var failureMessage = {
            id: message.id,
            successful: false,
            channel: message.channel,
            failure: failure
          };
          failure.message = message;

          switch (message.channel) {
            case '/meta/handshake':
              _handshakeFailure(failureMessage);

              break;

            case '/meta/connect':
              _connectFailure(failureMessage);

              break;

            case '/meta/disconnect':
              _disconnectFailure(failureMessage);

              break;

            case '/meta/subscribe':
              failureMessage.subscription = message.subscription;

              _subscribeFailure(failureMessage);

              break;

            case '/meta/unsubscribe':
              failureMessage.subscription = message.subscription;

              _unsubscribeFailure(failureMessage);

              break;

            default:
              _messageFailure(failureMessage);

              break;
          }
        }
      };

      function _hasSubscriptions(channel) {
        var subscriptions = _listeners[channel];

        if (subscriptions) {
          for (var i = 0; i < subscriptions.length; ++i) {
            if (subscriptions[i]) {
              return true;
            }
          }
        }

        return false;
      }

      function _resolveScopedCallback(scope, callback) {
        var delegate = {
          scope: scope,
          method: callback
        };

        if (_isFunction(scope)) {
          delegate.scope = undefined;
          delegate.method = scope;
        } else {
          if (_isString(callback)) {
            if (!scope) {
              throw 'Invalid scope ' + scope;
            }

            delegate.method = scope[callback];

            if (!_isFunction(delegate.method)) {
              throw 'Invalid callback ' + callback + ' for scope ' + scope;
            }
          } else if (!_isFunction(callback)) {
            throw 'Invalid callback ' + callback;
          }
        }

        return delegate;
      }

      function _addListener(channel, scope, callback, isListener) {
        // The data structure is a map<channel, subscription[]>, where each subscription
        // holds the callback to be called and its scope.
        var delegate = _resolveScopedCallback(scope, callback);

        _cometd._debug('Adding', isListener ? 'listener' : 'subscription', 'on', channel, 'with scope', delegate.scope, 'and callback', delegate.method);

        var subscription = {
          channel: channel,
          scope: delegate.scope,
          callback: delegate.method,
          listener: isListener
        };
        var subscriptions = _listeners[channel];

        if (!subscriptions) {
          subscriptions = [];
          _listeners[channel] = subscriptions;
        } // Pushing onto an array appends at the end and returns the id associated with the element increased by 1.
        // Note that if:
        // a.push('a'); var hb=a.push('b'); delete a[hb-1]; var hc=a.push('c');
        // then:
        // hc==3, a.join()=='a',,'c', a.length==3


        subscription.id = subscriptions.push(subscription) - 1;

        _cometd._debug('Added', isListener ? 'listener' : 'subscription', subscription); // For backward compatibility: we used to return [channel, subscription.id]


        subscription[0] = channel;
        subscription[1] = subscription.id;
        return subscription;
      } //
      // PUBLIC API
      //

      /**
       * Registers the given transport under the given transport type.
       * The optional index parameter specifies the "priority" at which the
       * transport is registered (where 0 is the max priority).
       * If a transport with the same type is already registered, this function
       * does nothing and returns false.
       * @param type the transport type
       * @param transport the transport object
       * @param index the index at which this transport is to be registered
       * @return true if the transport has been registered, false otherwise
       * @see #unregisterTransport(type)
       */


      this.registerTransport = function (type, transport, index) {
        var result = _transports.add(type, transport, index);

        if (result) {
          this._debug('Registered transport', type);

          if (_isFunction(transport.registered)) {
            transport.registered(type, this);
          }
        }

        return result;
      };
      /**
       * Unregisters the transport with the given transport type.
       * @param type the transport type to unregister
       * @return the transport that has been unregistered,
       * or null if no transport was previously registered under the given transport type
       */


      this.unregisterTransport = function (type) {
        var transport = _transports.remove(type);

        if (transport !== null) {
          this._debug('Unregistered transport', type);

          if (_isFunction(transport.unregistered)) {
            transport.unregistered();
          }
        }

        return transport;
      };

      this.unregisterTransports = function () {
        _transports.clear();
      };
      /**
       * @return an array of all registered transport types
       */


      this.getTransportTypes = function () {
        return _transports.getTransportTypes();
      };

      this.findTransport = function (name) {
        return _transports.find(name);
      };
      /**
       * @returns the TransportRegistry object
       */


      this.getTransportRegistry = function () {
        return _transports;
      };
      /**
       * Configures the initial Bayeux communication with the Bayeux server.
       * Configuration is passed via an object that must contain a mandatory field <code>url</code>
       * of type string containing the URL of the Bayeux server.
       * @param configuration the configuration object
       */


      this.configure = function (configuration) {
        _configure.call(this, configuration);
      };
      /**
       * Configures and establishes the Bayeux communication with the Bayeux server
       * via a handshake and a subsequent connect.
       * @param configuration the configuration object
       * @param handshakeProps an object to be merged with the handshake message
       * @see #configure(configuration)
       * @see #handshake(handshakeProps)
       */


      this.init = function (configuration, handshakeProps) {
        this.configure(configuration);
        this.handshake(handshakeProps);
      };
      /**
       * Establishes the Bayeux communication with the Bayeux server
       * via a handshake and a subsequent connect.
       * @param handshakeProps an object to be merged with the handshake message
       * @param handshakeCallback a function to be invoked when the handshake is acknowledged
       */


      this.handshake = function (handshakeProps, handshakeCallback) {
        _setStatus('disconnected');

        _reestablish = false;

        _handshake(handshakeProps, handshakeCallback);
      };
      /**
       * Disconnects from the Bayeux server.
       * It is possible to suggest to attempt a synchronous disconnect, but this feature
       * may only be available in certain transports (for example, long-polling may support
       * it, callback-polling certainly does not).
       * @param sync whether attempt to perform a synchronous disconnect
       * @param disconnectProps an object to be merged with the disconnect message
       * @param disconnectCallback a function to be invoked when the disconnect is acknowledged
       */


      this.disconnect = function (sync, disconnectProps, disconnectCallback) {
        if (_isDisconnected()) {
          return;
        }

        if (typeof sync !== 'boolean') {
          disconnectCallback = disconnectProps;
          disconnectProps = sync;
          sync = false;
        }

        if (_isFunction(disconnectProps)) {
          disconnectCallback = disconnectProps;
          disconnectProps = undefined;
        }

        var bayeuxMessage = {
          id: _nextMessageId(),
          channel: '/meta/disconnect'
        }; // Do not allow the user to override important fields.

        var message = this._mixin(false, {}, disconnectProps, bayeuxMessage); // Save the callback.


        _cometd._putCallback(message.id, disconnectCallback);

        _setStatus('disconnecting');

        _send(sync === true, [message], false, 'disconnect');
      };
      /**
       * Marks the start of a batch of application messages to be sent to the server
       * in a single request, obtaining a single response containing (possibly) many
       * application reply messages.
       * Messages are held in a queue and not sent until {@link #endBatch()} is called.
       * If startBatch() is called multiple times, then an equal number of endBatch()
       * calls must be made to close and send the batch of messages.
       * @see #endBatch()
       */


      this.startBatch = function () {
        _startBatch();
      };
      /**
       * Marks the end of a batch of application messages to be sent to the server
       * in a single request.
       * @see #startBatch()
       */


      this.endBatch = function () {
        _endBatch();
      };
      /**
       * Executes the given callback in the given scope, surrounded by a {@link #startBatch()}
       * and {@link #endBatch()} calls.
       * @param scope the scope of the callback, may be omitted
       * @param callback the callback to be executed within {@link #startBatch()} and {@link #endBatch()} calls
       */


      this.batch = function (scope, callback) {
        var delegate = _resolveScopedCallback(scope, callback);

        this.startBatch();

        try {
          delegate.method.call(delegate.scope);
          this.endBatch();
        } catch (x) {
          this._info('Exception during execution of batch', x);

          this.endBatch();
          throw x;
        }
      };
      /**
       * Adds a listener for bayeux messages, performing the given callback in the given scope
       * when a message for the given channel arrives.
       * @param channel the channel the listener is interested to
       * @param scope the scope of the callback, may be omitted
       * @param callback the callback to call when a message is sent to the channel
       * @returns the subscription handle to be passed to {@link #removeListener(object)}
       * @see #removeListener(subscription)
       */


      this.addListener = function (channel, scope, callback) {
        if (arguments.length < 2) {
          throw 'Illegal arguments number: required 2, got ' + arguments.length;
        }

        if (!_isString(channel)) {
          throw 'Illegal argument type: channel must be a string';
        }

        return _addListener(channel, scope, callback, true);
      };
      /**
       * Removes the subscription obtained with a call to {@link #addListener(string, object, function)}.
       * @param subscription the subscription to unsubscribe.
       * @see #addListener(channel, scope, callback)
       */


      this.removeListener = function (subscription) {
        // Beware of subscription.id == 0, which is falsy => cannot use !subscription.id
        if (!subscription || !subscription.channel || !("id" in subscription)) {
          throw 'Invalid argument: expected subscription, not ' + subscription;
        }

        _removeListener(subscription);
      };
      /**
       * Removes all listeners registered with {@link #addListener(channel, scope, callback)} or
       * {@link #subscribe(channel, scope, callback)}.
       */


      this.clearListeners = function () {
        _listeners = {};
      };
      /**
       * Subscribes to the given channel, performing the given callback in the given scope
       * when a message for the channel arrives.
       * @param channel the channel to subscribe to
       * @param scope the scope of the callback, may be omitted
       * @param callback the callback to call when a message is sent to the channel
       * @param subscribeProps an object to be merged with the subscribe message
       * @param subscribeCallback a function to be invoked when the subscription is acknowledged
       * @return the subscription handle to be passed to {@link #unsubscribe(object)}
       */


      this.subscribe = function (channel, scope, callback, subscribeProps, subscribeCallback) {
        if (arguments.length < 2) {
          throw 'Illegal arguments number: required 2, got ' + arguments.length;
        }

        if (!_isString(channel)) {
          throw 'Illegal argument type: channel must be a string';
        }

        if (_isDisconnected()) {
          throw 'Illegal state: already disconnected';
        } // Normalize arguments


        if (_isFunction(scope)) {
          subscribeCallback = subscribeProps;
          subscribeProps = callback;
          callback = scope;
          scope = undefined;
        }

        if (_isFunction(subscribeProps)) {
          subscribeCallback = subscribeProps;
          subscribeProps = undefined;
        } // Only send the message to the server if this client has not yet subscribed to the channel


        var send = !_hasSubscriptions(channel);

        var subscription = _addListener(channel, scope, callback, false);

        if (send) {
          // Send the subscription message after the subscription registration to avoid
          // races where the server would send a message to the subscribers, but here
          // on the client the subscription has not been added yet to the data structures
          var bayeuxMessage = {
            id: _nextMessageId(),
            channel: '/meta/subscribe',
            subscription: channel
          }; // Do not allow the user to override important fields.

          var message = this._mixin(false, {}, subscribeProps, bayeuxMessage); // Save the callback.


          _cometd._putCallback(message.id, subscribeCallback);

          _queueSend(message);
        }

        return subscription;
      };
      /**
       * Unsubscribes the subscription obtained with a call to {@link #subscribe(string, object, function)}.
       * @param subscription the subscription to unsubscribe.
       * @param unsubscribeProps an object to be merged with the unsubscribe message
       * @param unsubscribeCallback a function to be invoked when the unsubscription is acknowledged
       */


      this.unsubscribe = function (subscription, unsubscribeProps, unsubscribeCallback) {
        if (arguments.length < 1) {
          throw 'Illegal arguments number: required 1, got ' + arguments.length;
        }

        if (_isDisconnected()) {
          throw 'Illegal state: already disconnected';
        }

        if (_isFunction(unsubscribeProps)) {
          unsubscribeCallback = unsubscribeProps;
          unsubscribeProps = undefined;
        } // Remove the local listener before sending the message
        // This ensures that if the server fails, this client does not get notifications


        this.removeListener(subscription);
        var channel = subscription.channel; // Only send the message to the server if this client unsubscribes the last subscription

        if (!_hasSubscriptions(channel)) {
          var bayeuxMessage = {
            id: _nextMessageId(),
            channel: '/meta/unsubscribe',
            subscription: channel
          }; // Do not allow the user to override important fields.

          var message = this._mixin(false, {}, unsubscribeProps, bayeuxMessage); // Save the callback.


          _cometd._putCallback(message.id, unsubscribeCallback);

          _queueSend(message);
        }
      };

      this.resubscribe = function (subscription, subscribeProps) {
        _removeSubscription(subscription);

        if (subscription) {
          return this.subscribe(subscription.channel, subscription.scope, subscription.callback, subscribeProps);
        }

        return undefined;
      };
      /**
       * Removes all subscriptions added via {@link #subscribe(channel, scope, callback, subscribeProps)},
       * but does not remove the listeners added via {@link addListener(channel, scope, callback)}.
       */


      this.clearSubscriptions = function () {
        _clearSubscriptions();
      };
      /**
       * Publishes a message on the given channel, containing the given content.
       * @param channel the channel to publish the message to
       * @param content the content of the message
       * @param publishProps an object to be merged with the publish message
       * @param publishCallback a function to be invoked when the publish is acknowledged by the server
       */


      this.publish = function (channel, content, publishProps, publishCallback) {
        if (arguments.length < 1) {
          throw 'Illegal arguments number: required 1, got ' + arguments.length;
        }

        if (!_isString(channel)) {
          throw 'Illegal argument type: channel must be a string';
        }

        if (/^\/meta\//.test(channel)) {
          throw 'Illegal argument: cannot publish to meta channels';
        }

        if (_isDisconnected()) {
          throw 'Illegal state: already disconnected';
        }

        if (_isFunction(content)) {
          publishCallback = content;
          content = publishProps = {};
        } else if (_isFunction(publishProps)) {
          publishCallback = publishProps;
          publishProps = {};
        }

        var bayeuxMessage = {
          id: _nextMessageId(),
          channel: channel,
          data: content
        }; // Do not allow the user to override important fields.

        var message = this._mixin(false, {}, publishProps, bayeuxMessage); // Save the callback.


        _cometd._putCallback(message.id, publishCallback);

        _queueSend(message);
      };

      this.remoteCall = function (target, content, timeout, callback) {
        if (arguments.length < 1) {
          throw 'Illegal arguments number: required 1, got ' + arguments.length;
        }

        if (!_isString(target)) {
          throw 'Illegal argument type: target must be a string';
        }

        if (_isDisconnected()) {
          throw 'Illegal state: already disconnected';
        }

        if (_isFunction(content)) {
          callback = content;
          content = {};
          timeout = _config.maxNetworkDelay;
        } else if (_isFunction(timeout)) {
          callback = timeout;
          timeout = _config.maxNetworkDelay;
        }

        if (typeof timeout !== 'number') {
          throw 'Illegal argument type: timeout must be a number';
        }

        if (!target.match(/^\//)) {
          target = '/' + target;
        }

        var channel = '/service' + target;
        var bayeuxMessage = {
          id: _nextMessageId(),
          channel: channel,
          data: content
        };
        var context = {
          callback: callback
        };

        if (timeout > 0) {
          context.timeout = Utils.setTimeout(_cometd, function () {
            _cometd._debug('Timing out remote call', bayeuxMessage, 'after', timeout, 'ms');

            _failMessage({
              id: bayeuxMessage.id,
              error: '406::timeout',
              successful: false,
              failure: {
                message: bayeuxMessage,
                reason: 'Remote Call Timeout'
              }
            });
          }, timeout);

          _cometd._debug('Scheduled remote call timeout', bayeuxMessage, 'in', timeout, 'ms');
        }

        _remoteCalls[bayeuxMessage.id] = context;

        _queueSend(bayeuxMessage);
      };
      /**
       * Returns a string representing the status of the bayeux communication with the Bayeux server.
       */


      this.getStatus = function () {
        return _status;
      };
      /**
       * Returns whether this instance has been disconnected.
       */


      this.isDisconnected = _isDisconnected;
      /**
       * Sets the backoff period used to increase the backoff time when retrying an unsuccessful or failed message.
       * Default value is 1 second, which means if there is a persistent failure the retries will happen
       * after 1 second, then after 2 seconds, then after 3 seconds, etc. So for example with 15 seconds of
       * elapsed time, there will be 5 retries (at 1, 3, 6, 10 and 15 seconds elapsed).
       * @param period the backoff period to set
       * @see #getBackoffIncrement()
       */

      this.setBackoffIncrement = function (period) {
        _config.backoffIncrement = period;
      };
      /**
       * Returns the backoff period used to increase the backoff time when retrying an unsuccessful or failed message.
       * @see #setBackoffIncrement(period)
       */


      this.getBackoffIncrement = function () {
        return _config.backoffIncrement;
      };
      /**
       * Returns the backoff period to wait before retrying an unsuccessful or failed message.
       */


      this.getBackoffPeriod = function () {
        return _backoff;
      };
      /**
       * Increases the backoff period up to the maximum value configured.
       * @returns the backoff period after increment
       * @see getBackoffIncrement
       */


      this.increaseBackoffPeriod = function () {
        return _increaseBackoff();
      };
      /**
       * Resets the backoff period to zero.
       */


      this.resetBackoffPeriod = function () {
        _resetBackoff();
      };
      /**
       * Sets the log level for console logging.
       * Valid values are the strings 'error', 'warn', 'info' and 'debug', from
       * less verbose to more verbose.
       * @param level the log level string
       */


      this.setLogLevel = function (level) {
        _config.logLevel = level;
      };
      /**
       * Registers an extension whose callbacks are called for every incoming message
       * (that comes from the server to this client implementation) and for every
       * outgoing message (that originates from this client implementation for the
       * server).
       * The format of the extension object is the following:
       * <pre>
       * {
       *     incoming: function(message) { ... },
       *     outgoing: function(message) { ... }
       * }
       * </pre>
       * Both properties are optional, but if they are present they will be called
       * respectively for each incoming message and for each outgoing message.
       * @param name the name of the extension
       * @param extension the extension to register
       * @return true if the extension was registered, false otherwise
       * @see #unregisterExtension(name)
       */


      this.registerExtension = function (name, extension) {
        if (arguments.length < 2) {
          throw 'Illegal arguments number: required 2, got ' + arguments.length;
        }

        if (!_isString(name)) {
          throw 'Illegal argument type: extension name must be a string';
        }

        var existing = false;

        for (var i = 0; i < _extensions.length; ++i) {
          var existingExtension = _extensions[i];

          if (existingExtension.name === name) {
            existing = true;
            break;
          }
        }

        if (!existing) {
          _extensions.push({
            name: name,
            extension: extension
          });

          this._debug('Registered extension', name); // Callback for extensions


          if (_isFunction(extension.registered)) {
            extension.registered(name, this);
          }

          return true;
        } else {
          this._info('Could not register extension with name', name, 'since another extension with the same name already exists');

          return false;
        }
      };
      /**
       * Unregister an extension previously registered with
       * {@link #registerExtension(name, extension)}.
       * @param name the name of the extension to unregister.
       * @return true if the extension was unregistered, false otherwise
       */


      this.unregisterExtension = function (name) {
        if (!_isString(name)) {
          throw 'Illegal argument type: extension name must be a string';
        }

        var unregistered = false;

        for (var i = 0; i < _extensions.length; ++i) {
          var extension = _extensions[i];

          if (extension.name === name) {
            _extensions.splice(i, 1);

            unregistered = true;

            this._debug('Unregistered extension', name); // Callback for extensions


            var ext = extension.extension;

            if (_isFunction(ext.unregistered)) {
              ext.unregistered();
            }

            break;
          }
        }

        return unregistered;
      };
      /**
       * Find the extension registered with the given name.
       * @param name the name of the extension to find
       * @return the extension found or null if no extension with the given name has been registered
       */


      this.getExtension = function (name) {
        for (var i = 0; i < _extensions.length; ++i) {
          var extension = _extensions[i];

          if (extension.name === name) {
            return extension.extension;
          }
        }

        return null;
      };
      /**
       * Returns the name assigned to this CometD object, or the string 'default'
       * if no name has been explicitly passed as parameter to the constructor.
       */


      this.getName = function () {
        return _name;
      };
      /**
       * Returns the clientId assigned by the Bayeux server during handshake.
       */


      this.getClientId = function () {
        return _clientId;
      };
      /**
       * Returns the URL of the Bayeux server.
       */


      this.getURL = function () {
        if (_transport) {
          var url = _transport.getURL();

          if (url) {
            return url;
          }

          url = _config.urls[_transport.getType()];

          if (url) {
            return url;
          }
        }

        return _config.url;
      };

      this.getTransport = function () {
        return _transport;
      };

      this.getConfiguration = function () {
        return this._mixin(true, {}, _config);
      };

      this.getAdvice = function () {
        return this._mixin(true, {}, _advice);
      };
    };

    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var TransportTypes = {
      LONG_POLLING: 'long-polling',
      WEBSOCKET: 'websocket'
    };

    /**
     * Base object with the common functionality for transports.
     */

    var Transport = function Transport() {
      var _type;

      var _cometd;

      var _url;
      /**
       * Function invoked just after a transport has been successfully registered.
       * @param type the type of transport (for example 'long-polling')
       * @param cometd the cometd object this transport has been registered to
       * @see #unregistered()
       */


      this.registered = function (type, cometd) {
        _type = type;
        _cometd = cometd;
      };
      /**
       * Function invoked just after a transport has been successfully unregistered.
       * @see #registered(type, cometd)
       */


      this.unregistered = function () {
        _type = null;
        _cometd = null;
      };

      this._debug = function () {
        _cometd._debug.apply(_cometd, arguments);
      };

      this._mixin = function () {
        return _cometd._mixin.apply(_cometd, arguments);
      };

      this.getConfiguration = function () {
        return _cometd.getConfiguration();
      };

      this.getAdvice = function () {
        return _cometd.getAdvice();
      };

      this.setTimeout = function (funktion, delay) {
        return Utils.setTimeout(_cometd, funktion, delay);
      };

      this.clearTimeout = function (handle) {
        Utils.clearTimeout(handle);
      };
      /**
       * Converts the given response into an array of bayeux messages
       * @param response the response to convert
       * @return an array of bayeux messages obtained by converting the response
       */


      this.convertToMessages = function (response) {
        if (Utils.isString(response)) {
          try {
            return JSON.parse(response);
          } catch (x) {
            this._debug('Could not convert to JSON the following string', '"' + response + '"');

            throw x;
          }
        }

        if (Utils.isArray(response)) {
          return response;
        }

        if (response === undefined || response === null) {
          return [];
        }

        if (response instanceof Object) {
          return [response];
        }

        throw 'Conversion Error ' + response + ', typeof ' + typeof response;
      };
      /**
       * Returns whether this transport can work for the given version and cross domain communication case.
       * @param version a string indicating the transport version
       * @param crossDomain a boolean indicating whether the communication is cross domain
       * @param url the URL to connect to
       * @return true if this transport can work for the given version and cross domain communication case,
       * false otherwise
       */


      this.accept = function (version, crossDomain, url) {
        throw 'Abstract';
      };
      /**
       * Returns the type of this transport.
       * @see #registered(type, cometd)
       */


      this.getType = function () {
        return _type;
      };

      this.getURL = function () {
        return _url;
      };

      this.setURL = function (url) {
        _url = url;
      };

      this.send = function (envelope, metaConnect) {
        throw 'Abstract';
      };

      this.reset = function (init) {
        this._debug('Transport', _type, 'reset', init ? 'initial' : 'retry');
      };

      this.abort = function () {
        this._debug('Transport', _type, 'aborted');
      };

      this.toString = function () {
        return this.getType();
      };
    };

    var derive = function (baseObject) {
      function F() {}

      F.prototype = baseObject;
      return new F();
    };
    Transport.derive = derive;

    /**
     * Base object with the common functionality for transports based on requests.
     * The key responsibility is to allow at most 2 outstanding requests to the server,
     * to avoid that requests are sent behind a long poll.
     * To achieve this, we have one reserved request for the long poll, and all other
     * requests are serialized one after the other.
     */

    var RequestTransport = function RequestTransport() {
      var _super = new Transport();

      var _self = Transport.derive(_super);

      var _requestIds = 0;
      var _metaConnectRequest = null;
      var _requests = [];
      var _envelopes = [];

      function _coalesceEnvelopes(envelope) {
        while (_envelopes.length > 0) {
          var envelopeAndRequest = _envelopes[0];
          var newEnvelope = envelopeAndRequest[0];
          var newRequest = envelopeAndRequest[1];

          if (newEnvelope.url === envelope.url && newEnvelope.sync === envelope.sync) {
            _envelopes.shift();

            envelope.messages = envelope.messages.concat(newEnvelope.messages);

            this._debug('Coalesced', newEnvelope.messages.length, 'messages from request', newRequest.id);

            continue;
          }

          break;
        }
      }

      function _transportSend(envelope, request) {
        this.transportSend(envelope, request);
        request.expired = false;

        if (!envelope.sync) {
          var maxDelay = this.getConfiguration().maxNetworkDelay;
          var delay = maxDelay;

          if (request.metaConnect === true) {
            delay += this.getAdvice().timeout;
          }

          this._debug('Transport', this.getType(), 'waiting at most', delay, 'ms for the response, maxNetworkDelay', maxDelay);

          var self = this;
          request.timeout = self.setTimeout(function () {
            request.expired = true;
            var errorMessage = 'Request ' + request.id + ' of transport ' + self.getType() + ' exceeded ' + delay + ' ms max network delay';
            var failure = {
              reason: errorMessage
            };
            var xhr = request.xhr;
            failure.httpCode = self.xhrStatus(xhr);
            self.abortXHR(xhr);

            self._debug(errorMessage);

            self.complete(request, false, request.metaConnect);
            envelope.onFailure(xhr, envelope.messages, failure);
          }, delay);
        }
      }

      function _queueSend(envelope) {
        var requestId = ++_requestIds;
        var request = {
          id: requestId,
          metaConnect: false,
          envelope: envelope
        }; // Consider the metaConnect requests which should always be present

        if (_requests.length < this.getConfiguration().maxConnections - 1) {
          _requests.push(request);

          _transportSend.call(this, envelope, request);
        } else {
          this._debug('Transport', this.getType(), 'queueing request', requestId, 'envelope', envelope);

          _envelopes.push([envelope, request]);
        }
      }

      function _metaConnectComplete(request) {
        var requestId = request.id;

        this._debug('Transport', this.getType(), 'metaConnect complete, request', requestId);

        if (_metaConnectRequest !== null && _metaConnectRequest.id !== requestId) {
          throw 'Longpoll request mismatch, completing request ' + requestId;
        } // Reset metaConnect request


        _metaConnectRequest = null;
      }

      function _complete(request, success) {
        var index = Utils.inArray(request, _requests); // The index can be negative if the request has been aborted

        if (index >= 0) {
          _requests.splice(index, 1);
        }

        if (_envelopes.length > 0) {
          var envelopeAndRequest = _envelopes.shift();

          var nextEnvelope = envelopeAndRequest[0];
          var nextRequest = envelopeAndRequest[1];

          this._debug('Transport dequeued request', nextRequest.id);

          if (success) {
            if (this.getConfiguration().autoBatch) {
              _coalesceEnvelopes.call(this, nextEnvelope);
            }

            _queueSend.call(this, nextEnvelope);

            this._debug('Transport completed request', request.id, nextEnvelope);
          } else {
            // Keep the semantic of calling response callbacks asynchronously after the request
            var self = this;
            self.setTimeout(function () {
              self.complete(nextRequest, false, nextRequest.metaConnect);
              var failure = {
                reason: 'Previous request failed'
              };
              var xhr = nextRequest.xhr;
              failure.httpCode = self.xhrStatus(xhr);
              nextEnvelope.onFailure(xhr, nextEnvelope.messages, failure);
            }, 0);
          }
        }
      }

      _self.complete = function (request, success, metaConnect) {
        if (metaConnect) {
          _metaConnectComplete.call(this, request);
        } else {
          _complete.call(this, request, success);
        }
      };
      /**
       * Performs the actual send depending on the transport type details.
       * @param envelope the envelope to send
       * @param request the request information
       */


      _self.transportSend = function (envelope, request) {
        throw 'Abstract';
      };

      _self.transportSuccess = function (envelope, request, responses) {
        if (!request.expired) {
          this.clearTimeout(request.timeout);
          this.complete(request, true, request.metaConnect);

          if (responses && responses.length > 0) {
            envelope.onSuccess(responses);
          } else {
            envelope.onFailure(request.xhr, envelope.messages, {
              httpCode: 204
            });
          }
        }
      };

      _self.transportFailure = function (envelope, request, failure) {
        if (!request.expired) {
          this.clearTimeout(request.timeout);
          this.complete(request, false, request.metaConnect);
          envelope.onFailure(request.xhr, envelope.messages, failure);
        }
      };

      function _metaConnectSend(envelope) {
        if (_metaConnectRequest !== null) {
          throw 'Concurrent metaConnect requests not allowed, request id=' + _metaConnectRequest.id + ' not yet completed';
        }

        var requestId = ++_requestIds;

        this._debug('Transport', this.getType(), 'metaConnect send, request', requestId, 'envelope', envelope);

        var request = {
          id: requestId,
          metaConnect: true,
          envelope: envelope
        };

        _transportSend.call(this, envelope, request);

        _metaConnectRequest = request;
      }

      _self.send = function (envelope, metaConnect) {
        if (metaConnect) {
          _metaConnectSend.call(this, envelope);
        } else {
          _queueSend.call(this, envelope);
        }
      };

      _self.abort = function () {
        _super.abort();

        for (var i = 0; i < _requests.length; ++i) {
          var request = _requests[i];

          if (request) {
            this._debug('Aborting request', request);

            if (!this.abortXHR(request.xhr)) {
              this.transportFailure(request.envelope, request, {
                reason: 'abort'
              });
            }
          }
        }

        if (_metaConnectRequest) {
          this._debug('Aborting metaConnect request', _metaConnectRequest);

          if (!this.abortXHR(_metaConnectRequest.xhr)) {
            this.transportFailure(_metaConnectRequest.envelope, _metaConnectRequest, {
              reason: 'abort'
            });
          }
        }

        this.reset(true);
      };

      _self.reset = function (init) {
        _super.reset(init);

        _metaConnectRequest = null;
        _requests = [];
        _envelopes = [];
      };

      _self.abortXHR = function (xhr) {
        if (xhr) {
          try {
            var state = xhr.readyState;
            xhr.abort();
            return state !== XMLHttpRequest.UNSENT;
          } catch (x) {
            this._debug(x);
          }
        }

        return false;
      };

      _self.xhrStatus = function (xhr) {
        if (xhr) {
          try {
            return xhr.status;
          } catch (x) {
            this._debug(x);
          }
        }

        return -1;
      };

      return _self;
    };

    var LongPollingTransport = function LongPollingTransport() {
      var _super = new RequestTransport();

      var _self = Transport.derive(_super); // By default, support cross domain


      var _supportsCrossDomain = true;

      _self.accept = function (version, crossDomain, url) {
        return _supportsCrossDomain || !crossDomain;
      };

      _self.xhrSend = function (packet) {
        throw 'Abstract';
      };

      _self.transportSend = function (envelope, request) {
        this._debug('Transport', this.getType(), 'sending request', request.id, 'envelope', envelope);

        var self = this;

        try {
          var sameStack = true;
          request.xhr = this.xhrSend({
            transport: this,
            url: envelope.url,
            sync: envelope.sync,
            headers: this.getConfiguration().requestHeaders,
            body: JSON.stringify(envelope.messages),
            onSuccess: function (response) {
              self._debug('Transport', self.getType(), 'received response', response);

              var success = false;

              try {
                var received = self.convertToMessages(response);

                if (received.length === 0) {
                  _supportsCrossDomain = false;
                  self.transportFailure(envelope, request, {
                    httpCode: 204
                  });
                } else {
                  success = true;
                  self.transportSuccess(envelope, request, received);
                }
              } catch (x) {
                self._debug(x);

                if (!success) {
                  _supportsCrossDomain = false;
                  var failure = {
                    exception: x
                  };
                  failure.httpCode = self.xhrStatus(request.xhr);
                  self.transportFailure(envelope, request, failure);
                }
              }
            },
            onError: function (reason, exception) {
              self._debug('Transport', self.getType(), 'received error', reason, exception);

              _supportsCrossDomain = false;
              var failure = {
                reason: reason,
                exception: exception
              };
              failure.httpCode = self.xhrStatus(request.xhr);

              if (sameStack) {
                // Keep the semantic of calling response callbacks asynchronously after the request
                self.setTimeout(function () {
                  self.transportFailure(envelope, request, failure);
                }, 0);
              } else {
                self.transportFailure(envelope, request, failure);
              }
            }
          });
          sameStack = false;
        } catch (x) {
          _supportsCrossDomain = false; // Keep the semantic of calling response callbacks asynchronously after the request

          self.setTimeout(function () {
            self.transportFailure(envelope, request, {
              exception: x
            });
          }, 0);
        }
      };

      _self.reset = function (init) {
        _super.reset(init);

        _supportsCrossDomain = true;
      };

      return _self;
    };

    /**
     * Implements LongPollingTransport using fetch() API
     * @access private
     * @param {Function} fetch
     * @return {FetchLongPollingTransport}
     */

    function FetchLongPollingTransport(fetch) {
      var _super = new LongPollingTransport();

      var that = Transport.derive(_super);
      /**
       * Implements transport via fetch() API
       * @param {Object} packet
       */

      that.xhrSend = function (packet) {
        fetch(packet.url, {
          method: 'post',
          body: packet.body,
          headers: Object.assign(packet.headers, {
            'Content-Type': 'application/json;charset=UTF-8'
          })
        }).then(function (response) {
          return response.json();
        }).then(packet.onSuccess).catch(packet.onError);
      };

      return that;
    } // Export FetchLongPollingTransport


    var FetchLongPollingTransport_1 = FetchLongPollingTransport;

    /**
     * Implements WebSocketTransport using WebSocket API
     * @access private
     * @param {Function} WebSocket
     * @return {WebSocketTransport}
     */

    function WebSocketTransport(WebSocket) {
      var _super = new Transport();

      var _self = Transport.derive(_super);

      var _cometd; // By default WebSocket is supported


      var _webSocketSupported = true; // Whether we were able to establish a WebSocket connection

      var _webSocketConnected = false;
      var _stickyReconnect = true; // The context contains the envelopes that have been sent
      // and the timeouts for the messages that have been sent.

      var _context = null;
      var _connecting = null;
      var _connected = false;
      var _successCallback = null;

      _self.reset = function (init) {
        _super.reset(init);

        _webSocketSupported = true;

        if (init) {
          _webSocketConnected = false;
        }

        _stickyReconnect = true;
        _context = null;
        _connecting = null;
        _connected = false;
      };

      function _forceClose(context, event) {
        if (context) {
          this.webSocketClose(context, event.code, event.reason); // Force immediate failure of pending messages to trigger reconnect.
          // This is needed because the server may not reply to our close()
          // and therefore the onclose function is never called.

          this.onClose(context, event);
        }
      }

      function _sameContext(context) {
        return context === _connecting || context === _context;
      }

      function _storeEnvelope(context, envelope, metaConnect) {
        var messageIds = [];

        for (var i = 0; i < envelope.messages.length; ++i) {
          var message = envelope.messages[i];

          if (message.id) {
            messageIds.push(message.id);
          }
        }

        context.envelopes[messageIds.join(',')] = [envelope, metaConnect];

        this._debug('Transport', this.getType(), 'stored envelope, envelopes', context.envelopes);
      }

      function _websocketConnect(context) {
        // We may have multiple attempts to open a WebSocket
        // connection, for example a /meta/connect request that
        // may take time, along with a user-triggered publish.
        // Early return if we are already connecting.
        if (_connecting) {
          return;
        } // Mangle the URL, changing the scheme from 'http' to 'ws'.


        var url = _cometd.getURL().replace(/^http/, 'ws');

        this._debug('Transport', this.getType(), 'connecting to URL', url);

        try {
          var protocol = _cometd.getConfiguration().protocol;

          context.webSocket = protocol ? new WebSocket(url, protocol) : new WebSocket(url);
          _connecting = context;
        } catch (x) {
          _webSocketSupported = false;

          this._debug('Exception while creating WebSocket object', x);

          throw x;
        } // By default use sticky reconnects.


        _stickyReconnect = _cometd.getConfiguration().stickyReconnect !== false;
        var self = this;

        var connectTimeout = _cometd.getConfiguration().connectTimeout;

        if (connectTimeout > 0) {
          context.connectTimer = self.setTimeout(function () {
            _cometd._debug('Transport', self.getType(), 'timed out while connecting to URL', url, ':', connectTimeout, 'ms'); // The connection was not opened, close anyway.


            _forceClose.call(self, context, {
              code: 1000,
              reason: 'Connect Timeout'
            });
          }, connectTimeout);
        }

        var onopen = function () {
          _cometd._debug('WebSocket onopen', context);

          if (context.connectTimer) {
            self.clearTimeout(context.connectTimer);
          }

          if (_sameContext(context)) {
            _connecting = null;
            _context = context;
            _webSocketConnected = true;
            self.onOpen(context);
          } else {
            // We have a valid connection already, close this one.
            _cometd._warn('Closing extra WebSocket connection', this, 'active connection', _context);

            _forceClose.call(self, context, {
              code: 1000,
              reason: 'Extra Connection'
            });
          }
        }; // This callback is invoked when the server sends the close frame.
        // The close frame for a connection may arrive *after* another
        // connection has been opened, so we must make sure that actions
        // are performed only if it's the same connection.


        var onclose = function (event) {
          event = event || {
            code: 1000
          };

          _cometd._debug('WebSocket onclose', context, event, 'connecting', _connecting, 'current', _context);

          if (context.connectTimer) {
            self.clearTimeout(context.connectTimer);
          }

          self.onClose(context, event);
        };

        var onmessage = function (wsMessage) {
          _cometd._debug('WebSocket onmessage', wsMessage, context);

          self.onMessage(context, wsMessage);
        };

        context.webSocket.onopen = onopen;
        context.webSocket.onclose = onclose;

        context.webSocket.onerror = function () {
          // Clients should call onclose(), but if they do not we do it here for safety.
          onclose({
            code: 1000,
            reason: 'Error'
          });
        };

        context.webSocket.onmessage = onmessage;

        this._debug('Transport', this.getType(), 'configured callbacks on', context);
      }

      function _webSocketSend(context, envelope, metaConnect) {
        var json = JSON.stringify(envelope.messages);
        context.webSocket.send(json);

        this._debug('Transport', this.getType(), 'sent', envelope, 'metaConnect =', metaConnect); // Manage the timeout waiting for the response.


        var maxDelay = this.getConfiguration().maxNetworkDelay;
        var delay = maxDelay;

        if (metaConnect) {
          delay += this.getAdvice().timeout;
          _connected = true;
        }

        var self = this;
        var messageIds = [];

        for (var i = 0; i < envelope.messages.length; ++i) {
          (function () {
            var message = envelope.messages[i];

            if (message.id) {
              messageIds.push(message.id);
              context.timeouts[message.id] = self.setTimeout(function () {
                _cometd._debug('Transport', self.getType(), 'timing out message', message.id, 'after', delay, 'on', context);

                _forceClose.call(self, context, {
                  code: 1000,
                  reason: 'Message Timeout'
                });
              }, delay);
            }
          })();
        }

        this._debug('Transport', this.getType(), 'waiting at most', delay, 'ms for messages', messageIds, 'maxNetworkDelay', maxDelay, ', timeouts:', context.timeouts);
      }

      _self._notifySuccess = function (fn, messages) {
        fn.call(this, messages);
      };

      _self._notifyFailure = function (fn, context, messages, failure) {
        fn.call(this, context, messages, failure);
      };

      function _send(context, envelope, metaConnect) {
        try {
          if (context === null) {
            context = _connecting || {
              envelopes: {},
              timeouts: {}
            };

            _storeEnvelope.call(this, context, envelope, metaConnect);

            _websocketConnect.call(this, context);
          } else {
            _storeEnvelope.call(this, context, envelope, metaConnect);

            _webSocketSend.call(this, context, envelope, metaConnect);
          }
        } catch (x) {
          // Keep the semantic of calling response callbacks asynchronously after the request.
          var self = this;
          self.setTimeout(function () {
            _forceClose.call(self, context, {
              code: 1000,
              reason: 'Exception',
              exception: x
            });
          }, 0);
        }
      }

      _self.onOpen = function (context) {
        var envelopes = context.envelopes;

        this._debug('Transport', this.getType(), 'opened', context, 'pending messages', envelopes);

        for (var key in envelopes) {
          if (envelopes.hasOwnProperty(key)) {
            var element = envelopes[key];
            var envelope = element[0];
            var metaConnect = element[1]; // Store the success callback, which is independent from the envelope,
            // so that it can be used to notify arrival of messages.

            _successCallback = envelope.onSuccess;

            _webSocketSend.call(this, context, envelope, metaConnect);
          }
        }
      };

      _self.onMessage = function (context, wsMessage) {
        this._debug('Transport', this.getType(), 'received websocket message', wsMessage, context);

        var close = false;
        var messages = this.convertToMessages(wsMessage.data);
        var messageIds = [];

        for (var i = 0; i < messages.length; ++i) {
          var message = messages[i]; // Detect if the message is a response to a request we made.
          // If it's a meta message, for sure it's a response; otherwise it's
          // a publish message and publish responses don't have the data field.

          if (/^\/meta\//.test(message.channel) || message.data === undefined) {
            if (message.id) {
              messageIds.push(message.id);
              var timeout = context.timeouts[message.id];

              if (timeout) {
                this.clearTimeout(timeout);
                delete context.timeouts[message.id];

                this._debug('Transport', this.getType(), 'removed timeout for message', message.id, ', timeouts', context.timeouts);
              }
            }
          }

          if ('/meta/connect' === message.channel) {
            _connected = false;
          }

          if ('/meta/disconnect' === message.channel && !_connected) {
            close = true;
          }
        } // Remove the envelope corresponding to the messages.


        var removed = false;
        var envelopes = context.envelopes;

        for (var j = 0; j < messageIds.length; ++j) {
          var id = messageIds[j];

          for (var key in envelopes) {
            if (envelopes.hasOwnProperty(key)) {
              var ids = key.split(',');
              var index = Utils.inArray(id, ids);

              if (index >= 0) {
                removed = true;
                ids.splice(index, 1);
                var envelope = envelopes[key][0];
                var metaConnect = envelopes[key][1];
                delete envelopes[key];

                if (ids.length > 0) {
                  envelopes[ids.join(',')] = [envelope, metaConnect];
                }

                break;
              }
            }
          }
        }

        if (removed) {
          this._debug('Transport', this.getType(), 'removed envelope, envelopes', envelopes);
        }

        this._notifySuccess(_successCallback, messages);

        if (close) {
          this.webSocketClose(context, 1000, 'Disconnect');
        }
      };

      _self.onClose = function (context, event) {
        this._debug('Transport', this.getType(), 'closed', context, event);

        if (_sameContext(context)) {
          // Remember if we were able to connect.
          // This close event could be due to server shutdown,
          // and if it restarts we want to try websocket again.
          _webSocketSupported = _stickyReconnect && _webSocketConnected;
          _connecting = null;
          _context = null;
        }

        var timeouts = context.timeouts;
        context.timeouts = {};

        for (var id in timeouts) {
          if (timeouts.hasOwnProperty(id)) {
            this.clearTimeout(timeouts[id]);
          }
        }

        var envelopes = context.envelopes;
        context.envelopes = {};

        for (var key in envelopes) {
          if (envelopes.hasOwnProperty(key)) {
            var envelope = envelopes[key][0];
            var metaConnect = envelopes[key][1];

            if (metaConnect) {
              _connected = false;
            }

            var failure = {
              websocketCode: event.code,
              reason: event.reason
            };

            if (event.exception) {
              failure.exception = event.exception;
            }

            this._notifyFailure(envelope.onFailure, context, envelope.messages, failure);
          }
        }
      };

      _self.registered = function (type, cometd) {
        _super.registered(type, cometd);

        _cometd = cometd;
      };

      _self.accept = function (version, crossDomain, url) {
        this._debug('Transport', this.getType(), 'accept, supported:', _webSocketSupported); // Using !! to return a boolean (and not the WebSocket object).


        return _webSocketSupported && !('string' === typeof WebSocket) && _cometd.websocketEnabled !== false;
      };

      _self.send = function (envelope, metaConnect) {
        this._debug('Transport', this.getType(), 'sending', envelope, 'metaConnect =', metaConnect);

        _send.call(this, _context, envelope, metaConnect);
      };

      _self.webSocketClose = function (context, code, reason) {
        try {
          if (context.webSocket) {
            context.webSocket.close(code, reason);
          }
        } catch (x) {
          this._debug(x);
        }
      };

      _self.abort = function () {
        _super.abort();

        _forceClose.call(this, _context, {
          code: 1000,
          reason: 'Abort'
        });

        this.reset(true);
      };

      return _self;
    }

    var WebSocketTransport_1 = WebSocketTransport;

    var Transports = createCommonjsModule(function (module, exports) {
      // Use node-fetch implementation
      exports.fetch = function () {
        var context = null;

        if (typeof self !== 'undefined') {
          // Default
          context = self;
        } else if (typeof commonjsGlobal !== 'undefined') {
          // React Native
          context = commonjsGlobal;
        } else if (typeof window !== 'undefined') {
          // Browser
          context = window;
        } else {
          throw new Error('Unsupported global context object');
        }

        return fetch.apply(context, arguments);
      }; // Use node-websocket implementation


      exports.WebSocket = typeof WebSocket === 'undefined' ? null : WebSocket;
      /**
       * Long polling transport layer
       */

      var WEBSOCKET_TRANSPORT = {
        type: TransportTypes.WEBSOCKET,
        Transport: WebSocketTransport_1,
        parameters: exports.WebSocket
      };
      exports.WEBSOCKET_TRANSPORT = WEBSOCKET_TRANSPORT;
      /**
       * Long polling transport layer
       */

      var LONG_POLLING_TRANSPORT = {
        type: TransportTypes.LONG_POLLING,
        Transport: FetchLongPollingTransport_1,
        parameters: exports.fetch
      };
      exports.LONG_POLLING_TRANSPORT = LONG_POLLING_TRANSPORT;
      /**
       * CometD Transports Layers map
       */

      var ALL = [WEBSOCKET_TRANSPORT, LONG_POLLING_TRANSPORT];
      exports.ALL = ALL;
      /**
       * Get overloaded config from environment
       */

      var getOverloadedConfigFromEnvironment = function getOverloadedConfigFromEnvironment() {
        var env = typeof document === 'undefined' ? {} : document.documentElement.dataset;
        var platformUrl = env.zpPlatformUrl;
        var appName = env.zpSandboxid;
        return {
          platformUrl: platformUrl,
          appName: appName
        };
      };

      exports.getOverloadedConfigFromEnvironment = getOverloadedConfigFromEnvironment;
    });
    var Transports_1 = Transports.fetch;
    var Transports_2 = Transports.WebSocket;
    var Transports_3 = Transports.WEBSOCKET_TRANSPORT;
    var Transports_4 = Transports.LONG_POLLING_TRANSPORT;
    var Transports_5 = Transports.ALL;
    var Transports_6 = Transports.getOverloadedConfigFromEnvironment;

    var CometD$1 = CometD;
    var Transports$1 = Transports;

    const TYPE_PATTERN = /^\[object (\w+)\]$/;
    const _ref = {},
          toString = _ref.toString;

    const stringify = value => toString.apply(value);

    const getType = value => {
      const _ref2 = TYPE_PATTERN.exec(stringify(value)) || [],
            _ref3 = _slicedToArray(_ref2, 2),
            _ref3$ = _ref3[1],
            type = _ref3$ === void 0 ? '' : _ref3$;

      return type;
    };

    class TimeoutError extends Error {}
    /**
     * Wrap async function execution in timeout
     * @param {() => Promise<any>} task
     * @param {number} timeout
     */

    function timeoutify(task, timeout = 1000, details = '') {
      return function (...parameters) {
        return new Promise(function (resolve, reject) {
          const timer = setTimeout(() => reject(Object.assign(new TimeoutError(`Timeout reached after ${timeout}ms ${details}`), {
            code: 'TIMEOUT'
          })), timeout);

          try {
            const response = task(...parameters);

            if (getType(response) === Promise.name) {
              return response.then((...success) => (clearInterval(timer), resolve(...success)), (...failed) => (clearInterval(timer), reject(...failed)));
            } else {
              clearInterval(timer);
              return resolve(response);
            }
          } catch (error) {
            clearInterval(timer);
            return reject(error);
          }
        });
      };
    }

    /**
     * Match unsecure pattern web
     * @type {RegExp}
     */
    const HTTP_PATTERN = /^http:\/\/|^\/\//;
    /**
     * Http protocol
     * @type {string}
     */

    const HTTP_PROTOCOL = 'http:';
    /**
     * Https protocol
     * @type {string}
     */

    const HTTPS_PROTOCOL = 'https:';
    /**
     * Default ZetaPush API URL
     * @access private
     */

    const API_URL = 'https://celtia.zetapush.com/zbo/pub/business';
    /**
     * Force ssl based protocol for network echange
     * Cross Env (Browser/Node) test
     * @access private
     * @type boolean
     */

    const FORCE_HTTPS = typeof location === 'undefined' ? false : location.protocol === HTTPS_PROTOCOL;
    /**
     * @access private
     * @param {string} url
     * @param {boolean} forceHttps
     * @return {string}
     */

    const getSecureUrl = (url, forceHttps) => {
      return forceHttps ? url.replace(HTTP_PATTERN, `${HTTPS_PROTOCOL}//`) : url;
    };

    /**
     * @access private
     * @param {string} platformUrl
     * @return {string}
     */

    const normalizePlatformUrl = platformUrl => {
      const last = platformUrl.charAt(platformUrl.length - 1);
      const SLASH = '/';
      return last === SLASH ? platformUrl : platformUrl + SLASH;
    };
    /**
     * @access private
     * @param {{platformUrl: string, appName: string, forceHttps: boolean, transports: Transports}} parameters
     * @return {Promise}
     */


    const getSandboxConfig = ({
      platformUrl,
      appName,
      forceHttps,
      transports
    }) => {
      const normalizedSecuresPlatformUrl = normalizePlatformUrl(getSecureUrl(platformUrl, forceHttps));
      const url = `${normalizedSecuresPlatformUrl}${appName}`;
      const options = {
        protocol: forceHttps ? HTTPS_PROTOCOL : HTTP_PROTOCOL
      };
      return transports.fetch(url, options).then(response => response.json()) // TODO: Replace by a server side implementation when available
      .then(({
        servers,
        businessId = appName
      }) => ({
        appName: businessId,
        servers: servers.map(server => getSecureUrl(server, forceHttps))
      }));
    };

    const clean = (object = {}) => Object.entries(object).filter(([property, value]) => Boolean(value)).reduce((cleaned, [property, value]) => _objectSpread({}, cleaned, {
      [property]: value
    }), {});

    const merge = (base, overrides) => _objectSpread({}, base, clean(overrides));

    /**
     * @access private
     * @param Class Derived
     * @param Class Parent
     * @return {boolean}
     */
    const isDerivedOf = (Derived, Parent) => {
      let prototype = Object.getPrototypeOf(Derived);
      let is = false;

      while (!(is || prototype === null)) {
        is = prototype === Parent;
        prototype = Object.getPrototypeOf(prototype);
      }

      return is;
    };

    /**
     * Alpha numeric dictionary
     */
    const DICTIONARY = 'abcdefghijklmnopqrstuvwxyz0123456789';
    /**
     * Get random id
     * @return {string}
     */

    const uuid = (entropy = 7, dictionary = DICTIONARY) => Array.from(Array(entropy)).reduce(previous => {
      const next = dictionary.charAt(Math.floor(Math.random() * dictionary.length));
      return `${previous}${next}`;
    }, '');
    /**
     * @access private
     * @param {Array<Object>} list
     * @return {Object}
     */

    const shuffle = list => {
      const index = Math.floor(Math.random() * list.length);
      return list[index];
    };

    /**
     * Provide fallback for DOMStorage
     * @access protected
     */
    class MemoryStorage {
      constructor() {
        this._map = new Map();
      }

      getItem(key) {
        return this._map.get(key);
      }

      setItem(key, value) {
        return this._map.get(key);
      }

      removeItem(key) {
        this._map.delete(key);
      }

      clear() {
        this._map = new Map();
      }

      key(n) {
        return Array.from(this._map.keys())[n];
      }

      get length() {
        return this._map.size;
      }

    }
    /**
     * @type {Storage}
     * @access protected
     */


    const platformStorage = typeof localStorage === 'undefined' ? new MemoryStorage() : localStorage;

    /**
     * @type {string}
     */

    const ZETAPUSH_SESSION_KEY = 'zetapush.token';
    /**
     * Provide abstraction for token persistence
     * @access protected
     */

    class SessionPersistenceStrategy {
      /**
       * @param {{appName: string, storage: DOMStorage}} parameters
       */
      constructor({
        appName,
        storage = platformStorage
      } = {}) {
        /**
         * @access private
         * @type {DOMStorage}
         */
        this.storage = storage; // Set application name

        this.setAppName(appName);
      }
      /**
       * Set application name
       * @param {string} appName
       */


      setAppName(appName) {
        /**
         * @access private
         * @type {string}
         */
        this.key = `${ZETAPUSH_SESSION_KEY}.${appName}`;
      }
      /**
       * @return {string} session The stored session
       */


      get() {
        const key = this.key,
              storage = this.storage;
        const json = storage.getItem(key) || '{}';
        let session = {};

        try {
          session = JSON.parse(json);
        } catch (e) {}

        return session;
      }
      /**
       * @param {Object} session The session to store
       */


      set(session = {}) {
        const key = this.key,
              storage = this.storage;
        const json = JSON.stringify(session);

        try {
          storage.setItem(key, json);
        } catch (e) {}

        return session;
      }

    }

    class Timeout {
      static wrap(instance, timeout) {
        for (let method in instance) {
          if (typeof instance[method] === 'function' && (method !== '$publish' || method !== 'constructor')) {
            const wrapper = function wrapper(wrapped, context) {
              return function anonymous(...parameters) {
                const task = () => wrapped.apply(context, parameters);

                return task();
              };
            };

            instance[method] = wrapper(instance[method], instance, timeout);
          }
        }

        return instance;
      }

    }
    /**
     * CometD Messages enumeration
     * @type {Object}
     */


    const Message = {
      RECONNECT_HANDSHAKE_VALUE: 'handshake',
      RECONNECT_NONE_VALUE: 'none',
      RECONNECT_RETRY_VALUE: 'retry'
    };
    /**
     * Delay to update server url
     * @type {integer}
     */

    const UPDATE_SERVER_URL_DELAY = 250;
    /**
     * Default macro channel
     * @type {string}
     */

    const DEFAULT_MACRO_CHANNEL = 'completed';
    /**
     * Default error channel
     * @type {string}
     */

    const DEFAULT_ERROR_CHANNEL = 'error';
    /**
     * Default task channel
     * @type {string}
     */

    const DEFAULT_TASK_CHANNEL = 'call';
    /**
     * Default timeout for requests calls
     * @type {number}
     */

    const DEFAULT_TIMEOUT = 10000;
    /**
     * Provide utilities and abstraction on CometD Transport layer
     * @access private
     */

    class ClientHelper {
      /**
       * Create a new ZetaPush client helper
       */
      constructor({
        platformUrl,
        appName,
        forceHttps = false,
        authentication,
        resource = null,
        transports = Transports$1
      }) {
        // Merge config with overloaded environment

        /**
         * @access private
         * @type {Object}
         */
        this.options = merge({
          forceHttps,
          platformUrl,
          appName,
          transports
        }, transports.getOverloadedConfigFromEnvironment()); // Validate mandatory parameters

        const mandatory = ['appName', 'platformUrl'].filter(property => !this.options[property]);

        if (mandatory.length) {
          throw new Error(`Missing mandatory parameter(s) ${mandatory.join(', ')}`);
        }
        /**
         * @access private
         * @type {string}
         */


        this.appName = this.options.appName;
        /**
         * @access private
         * @type {function():AbstractHandshake}
         */

        this.authentication = authentication;
        /**
         * @access private
         * @type {string}
         */

        this.resource = resource;
        /**
         * @access private
         * @type {number}
         */

        this.requestId = 0;
        /**
         * @access private
         * @type {string}
         */

        this.userId = null;
        /**
         * @access private
         * @type {Object}
         */

        this.userInfo = null;
        /**
         * @access private
         * @type {string}
         */

        this.uniqId = uuid();
        /**
         * @access private
         * @type {Promise}
         */

        this.config = null;
        /**
         * @access private
         * @type {Array<Object>}
         */

        this.connectionListeners = [];
        /**
         * @access private
         * @type {boolean}
         */

        this.connected = false;
        /**
         * @access private
         * @type {boolean}
         */

        this.wasConnected = false;
        /**
         * @access private
         * @type {string}
         */

        this.serverUrl = null;
        /**
         * @access private
         * @type {string}
         */

        this.sessionId = null;
        /**
         * @access private
         * @type {Array<Object>}
         */

        this.subscribeQueue = [];
        /**
         * @access private
         * @type {CometD}
         */

        this.cometd = new CometD$1(); // Register transports layers

        transports.ALL.forEach(({
          type,
          Transport,
          parameters
        }) => {
          this.cometd.registerTransport(type, new Transport(parameters));
        }); // Handle transport exception

        this.cometd.onTransportException = (cometd$$1, transport) => {
          this.cometd._debug('ClientHelper::onTransportException', {
            transport
          }); // Try to find an other available server
          // Remove the current one from the _serverList array


          this.updateServerUrl();
        };

        this.cometd.addListener('/meta/handshake', ({
          ext,
          successful,
          advice,
          error
        }) => {
          this.cometd._debug('ClientHelper::/meta/handshake', {
            ext,
            successful,
            advice,
            error
          });

          if (successful) {
            const _ext$authentication = ext.authentication,
                  authentication = _ext$authentication === void 0 ? null : _ext$authentication;
            this.initialized(authentication);
          } else {
            this.handshakeFailure(error, ext);
          }
        });
        this.cometd.addListener('/meta/handshake', ({
          advice,
          error,
          ext,
          successful
        }) => {
          this.cometd._debug('ClientHelper::/meta/handshake', {
            ext,
            successful,
            advice,
            error
          }); // AuthNegotiation


          if (!successful) {
            if (typeof advice === 'undefined') {
              return;
            }

            if (Message.RECONNECT_NONE_VALUE === advice.reconnect) {
              this.authenticationFailed(error, ext);
            } else if (Message.RECONNECT_HANDSHAKE_VALUE === advice.reconnect) {
              this.negotiationFailed(error, ext);
            }
          }
        });
        this.cometd.addListener('/meta/connect', ({
          advice,
          channel,
          successful
        }) => {
          this.cometd._debug('ClientHelper::/meta/connect', {
            advice,
            channel,
            successful
          }); // ConnectionListener


          if (this.cometd.isDisconnected()) {
            this.connected = false; // Notify connection will close

            this.connectionWillClose();
          } else {
            this.wasConnected = this.connected;
            this.connected = successful;

            if (!this.wasConnected && this.connected) {
              this.cometd.batch(this, () => {
                // Unqueue subscriptions
                this.subscribeQueue.forEach(({
                  prefix,
                  listener,
                  subscriptions
                }) => {
                  this.subscribe(prefix, listener, subscriptions);
                });
              }); // Notify connection is established

              this.connectionEstablished();
            } else if (this.wasConnected && !this.connected) {
              // Notify connection is broken
              this.connectionBroken();
            }
          }
        });
        this.cometd.addListener('/meta/disconnect', ({
          channel,
          successful
        }) => {
          this.cometd._debug('ClientHelper::/meta/disconnect', {
            channel,
            successful
          });

          if (this.cometd.isDisconnected()) {
            this.connected = false; // Notify connection is closed

            this.connectionClosed();
          }
        });
      }
      /**
       * Add a connection listener to handle life cycle connection events
       * @param {ConnectionStatusListener} listener
       * @return {number} handler
       */


      addConnectionStatusListener(listener) {
        this.connectionListeners.push({
          enabled: true,
          listener: Object.assign(new ConnectionStatusListener(), listener)
        });
        return this.connectionListeners.length - 1;
      }
      /**
       * Notify listeners when handshake step succeed
       */


      authenticationFailed(error, ext) {
        this.userId = null;
        this.userInfo = null;
        this.connectionListeners.filter(({
          enabled
        }) => enabled).forEach(({
          listener
        }) => {
          listener.onFailedHandshake(error, ext);
        });
      }
      /**
       * Get one server from the list of available servers and do handshake
       */


      getServerAndDoHandshake() {
        const servers = this.getServers();

        if (servers.length > 0) {
          // Get a random server url
          this.serverUrl = shuffle(servers); // Configure CometD

          this.cometd.configure({
            url: `${this.serverUrl}/strd`,
            backoffIncrement: 1000,
            maxBackoff: 60000,
            appendMessageTypeToURL: false
          }); // Send handshake fields

          this.cometd.handshake(this.getHandshakeFields());
        } else {
          // No servers available
          this.config = null;
          this.noServerUrlAvailable();
        }
      }
      /**
       * Connect client using CometD Transport
       */


      connect() {
        if (!this.config) {
          getSandboxConfig(_objectSpread({}, this.options)).then(config => {
            this.config = config;
            this.appName = this.config.appName;
            this.getServerAndDoHandshake();
          }).catch(error => {
            this.config = null;
            this.connectionToServerFail(error);
          });
        } else {
          this.getServerAndDoHandshake();
        }
      }
      /**
       * Notify listeners when connection is broken
       */


      connectionBroken() {
        this.connectionListeners.filter(({
          enabled
        }) => enabled).forEach(({
          listener
        }) => {
          listener.onConnectionBroken();
        });
      }
      /**
       * Notify listeners when connection is closed
       */


      connectionClosed() {
        this.userId = null;
        this.userInfo = null;
        this.connectionListeners.filter(({
          enabled
        }) => enabled).forEach(({
          listener
        }) => {
          listener.onConnectionClosed();
        });
      }
      /**
       * Notify listeners when connection is established
       */


      connectionEstablished() {
        this.connectionListeners.filter(({
          enabled
        }) => enabled).forEach(({
          listener
        }) => {
          listener.onConnectionEstablished();
        });
      }
      /**
       * Notify listeners when connection to server fail
       */


      connectionToServerFail(failure) {
        this.connectionListeners.filter(({
          enabled
        }) => enabled).forEach(({
          listener
        }) => {
          listener.onConnectionToServerFail(failure);
        });
      }
      /**
       * Notify listeners when connection will close
       */


      connectionWillClose() {
        this.connectionListeners.filter(({
          enabled
        }) => enabled).forEach(({
          listener
        }) => {
          listener.onConnectionWillClose();
        });
      }
      /**
       * Create a promise based service
       * @param {{listener: Object, Type: class, deploymentId: string}} parameters
       * @return {Object} service
       */


      createAsyncService({
        listener,
        Type,
        deploymentId = Type.DEFAULT_DEPLOYMENT_ID,
        timeout = DEFAULT_TIMEOUT
      }) {
        const prefix = () => `/service/${this.getAppName()}/${deploymentId}`; // TODO Manage Timeout


        const $publish = this.getAsyncServicePublisher(prefix); // Create service by publisher

        const service = this.createServiceByPublisher({
          listener,
          prefix,
          Type,
          $publish
        });
        const wrapped = Timeout.wrap(service, timeout); // Return wrapped service instance

        return wrapped;
      }
      /**
       * Create a promise based macro service
       * @param {{listener: Object, Type: class, deploymentId: string}} parameters
       * @return {Object} service
       */


      createAsyncMacroService({
        listener,
        Type,
        deploymentId = Type.DEFAULT_DEPLOYMENT_ID,
        timeout = DEFAULT_TIMEOUT
      }) {
        const prefix = () => `/service/${this.getAppName()}/${deploymentId}`; // TODO Manage Timeout


        const $publish = this.getAsyncMacroPublisher(prefix); // Create service by publisher

        const service = this.createServiceByPublisher({
          listener,
          prefix,
          Type,
          $publish
        });
        const wrapped = Timeout.wrap(service, timeout); // Return wrapped service instance

        return wrapped;
      }
      /**
       * Create a promise based task service
       * @param {{deploymentId: string, namespace: string, timeout: number, Type: class}} parameters
       * @return {Object} service
       */


      createAsyncTaskService({
        Type,
        deploymentId = Type.DEFAULT_DEPLOYMENT_ID,
        namespace = '',
        timeout = DEFAULT_TIMEOUT
      }) {
        const prefix = () => `/service/${this.getAppName()}/${deploymentId}`; // TODO Manage Timeout


        const $publish = this.getAsyncTaskPublisher(prefix, namespace); // Create service by publisher

        const service = this.createServiceByPublisher({
          listener: {},
          prefix,
          Type,
          $publish
        });
        const wrapped = Timeout.wrap(service, timeout); // Return wrapped service instance

        return wrapped;
      }
      /**
       * Create a generic proxified macro service
       * @param {{deploymentId: string, timeout: number}} parameters
       * @return {Proxy} proxy
       * @throws {Error} Throw error if Proxy class is not defined
       */


      createProxyMacroService({
        deploymentId = Macro.DEFAULT_DEPLOYMENT_ID,
        timeout = DEFAULT_TIMEOUT
      }) {
        if (typeof Proxy === 'undefined') {
          throw new Error('`Proxy` is not support in your environment');
        }

        const prefix = () => `/service/${this.getAppName()}/${deploymentId}`;

        return new Proxy(Object.create(null), {
          get: (target, method) => {
            return timeoutify(parameters => {
              const channel = `${prefix()}/call`;
              const uniqRequestId = this.getUniqRequestId();
              const subscriptions = {};
              return new Promise((resolve, reject) => {
                const handler = ({
                  data = {}
                }) => {
                  const result = data.result,
                        _data$errors = data.errors,
                        errors = _data$errors === void 0 ? [] : _data$errors,
                        requestId = data.requestId;

                  if (requestId === uniqRequestId) {
                    // Handle errors
                    if (errors.length > 0) {
                      reject(errors);
                    } else {
                      resolve(result);
                    }

                    this.unsubscribe(subscriptions);
                  }
                }; // Create dynamic listener method


                const listener = {
                  [method]: handler,
                  [DEFAULT_MACRO_CHANNEL]: handler
                }; // Ad-Hoc subscription

                this.subscribe(prefix, listener, subscriptions); // Publish message on channel

                this.publish(channel, {
                  debug: 1,
                  hardFail: false,
                  name: method,
                  parameters,
                  requestId: uniqRequestId
                });
              });
            }, timeout, `while requesting ${prefix()}/call .${method}()`);
          }
        });
      }
      /**
       * Create a generic proxified task service
       * @param {{deploymentId: string, namespace: string, timeout: number}} parameters
       * @return {Proxy} proxy
       * @throws {Error} Throw error if Proxy class is not defined
       */


      createProxyTaskService({
        deploymentId = Queue.DEFAULT_DEPLOYMENT_ID,
        namespace = '',
        timeout = DEFAULT_TIMEOUT
      }) {
        if (typeof Proxy === 'undefined') {
          throw new Error('`Proxy` is not support in your environment');
        }

        const prefix = () => `/service/${this.getAppName()}/${deploymentId}`;

        return new Proxy(Object.create(null), {
          get: (target, method) => {
            return timeoutify((...parameters) => {
              const channel = `${prefix()}/${DEFAULT_TASK_CHANNEL}`;
              const uniqRequestId = this.getUniqRequestId();
              const subscriptions = {};
              return new Promise((resolve, reject) => {
                const onError = ({
                  data = {}
                }) => {
                  const requestId = data.requestId,
                        code = data.code,
                        message = data.message;

                  if (requestId === uniqRequestId) {
                    reject({
                      message,
                      code
                    });
                    this.unsubscribe(subscriptions);
                  }
                };

                const onSuccess = ({
                  data = {}
                }) => {
                  const result = data.result,
                        requestId = data.requestId;

                  if (requestId === uniqRequestId) {
                    resolve(result);
                    this.unsubscribe(subscriptions);
                  }
                }; // Create dynamic listener method


                const listener = {
                  [DEFAULT_TASK_CHANNEL]: onSuccess,
                  [DEFAULT_ERROR_CHANNEL]: onError
                }; // Ad-Hoc subscription

                this.subscribe(prefix, listener, subscriptions); // Publish message on channel

                this.publish(channel, {
                  data: {
                    name: method,
                    namespace,
                    parameters
                  },
                  requestId: uniqRequestId
                });
              });
            }, timeout, `while requesting ${prefix()}/${DEFAULT_TASK_CHANNEL} ${namespace}.${method}()`);
          }
        });
      }
      /**
       * Create a generic proxified service
       * @param {{deploymentId: string, timeout: number}} parameters
       * @return {Proxy} proxy
       * @throws {Error} Throw error if Proxy class is not defined
       */


      createProxyService({
        deploymentId,
        timeout = DEFAULT_TIMEOUT
      }) {
        if (typeof Proxy === 'undefined') {
          throw new Error('`Proxy` is not support in your environment');
        }

        const prefix = () => `/service/${this.getAppName()}/${deploymentId}`;

        return new Proxy(Object.create(null), {
          get: (target, method) => {
            return timeoutify(parameters => {
              const channel = `${prefix()}/${method}`;
              const uniqRequestId = this.getUniqRequestId();
              const subscriptions = {};
              return new Promise((resolve, reject) => {
                const onError = ({
                  data = {}
                }) => {
                  const requestId = data.requestId,
                        code = data.code,
                        message = data.message;

                  if (requestId === uniqRequestId) {
                    reject({
                      message,
                      code
                    });
                    this.unsubscribe(subscriptions);
                  }
                };

                const onSuccess = ({
                  data = {}
                }) => {
                  const requestId = data.requestId,
                        result = _objectWithoutProperties(data, ["requestId"]);

                  if (requestId === uniqRequestId) {
                    resolve(result);
                    this.unsubscribe(subscriptions);
                  }
                }; // Create dynamic listener method


                const listener = {
                  [method]: onSuccess,
                  [DEFAULT_ERROR_CHANNEL]: onError
                }; // Ad-Hoc subscription

                this.subscribe(prefix, listener, subscriptions); // Publish message on channel

                this.publish(channel, _objectSpread({}, parameters, {
                  requestId: uniqRequestId
                }));
              });
            }, timeout, `while requesting ${prefix()}/${method}`);
          }
        });
      }
      /**
       * Create a publish/subscribe service
       * @param {{listener: Object, Type: class, deploymentId: string}} parameters
       * @return {Object} service
       */


      createService({
        listener,
        Type,
        deploymentId = Type.DEFAULT_DEPLOYMENT_ID
      }) {
        const isMacroType = isDerivedOf(Type, Macro);

        const prefix = () => `/service/${this.getAppName()}/${deploymentId}`;

        const $publish = isMacroType ? this.getMacroPublisher(prefix) : this.getServicePublisher(prefix); // Create service by publisher

        return this.createServiceByPublisher({
          listener,
          prefix,
          Type,
          $publish
        });
      }
      /**
       * @param {{listener: Object, prefix: () => string, Type: class, $publish: Function}} parameters
       * @return {Object} service
       */


      createServiceByPublisher({
        listener,
        prefix,
        Type,
        $publish
      }) {
        const service = new Type({
          $publish
        }); // Store subscription in service instance

        service.$subscriptions = this.subscribe(prefix, listener);
        return service;
      }
      /**
       * Disconnect CometD client
       */


      disconnect() {
        this.cometd.disconnect(true);
      }
      /**
       * Get a publisher for a macro service that return a promise
       * @param {() => string} prefix - Channel prefix
       * @return {Function} publisher
       */


      getAsyncMacroPublisher(prefix) {
        return (name, parameters, hardFail = false, debug = 1) => {
          const channel = `${prefix()}/call`;
          const uniqRequestId = this.getUniqRequestId();
          const subscriptions = {};
          return new Promise((resolve, reject) => {
            const handler = ({
              data = {}
            }) => {
              const result = data.result,
                    _data$errors2 = data.errors,
                    errors = _data$errors2 === void 0 ? [] : _data$errors2,
                    requestId = data.requestId;

              if (requestId === uniqRequestId) {
                // Handle errors
                if (errors.length > 0) {
                  reject(errors);
                } else {
                  resolve(result);
                }

                this.unsubscribe(subscriptions);
              }
            }; // Create dynamic listener method


            const listener = {
              [name]: handler,
              [DEFAULT_MACRO_CHANNEL]: handler
            }; // Ad-Hoc subscription

            this.subscribe(prefix, listener, subscriptions); // Publish message on channel

            this.publish(channel, {
              debug,
              hardFail,
              name,
              parameters,
              requestId: uniqRequestId
            });
          });
        };
      }
      /**
       * Get a publisher for a service
       * @param {() => string} prefix - Channel prefix
       * @return {Function} publisher
       */


      getAsyncServicePublisher(prefix) {
        return (method, parameters) => {
          const channel = `${prefix()}/${method}`;
          const uniqRequestId = this.getUniqRequestId();
          const subscriptions = {};
          return new Promise((resolve, reject) => {
            const onError = ({
              data = {}
            }) => {
              const requestId = data.requestId,
                    code = data.code,
                    message = data.message;

              if (requestId === uniqRequestId) {
                reject({
                  message,
                  code
                });
                this.unsubscribe(subscriptions);
              }
            };

            const onSuccess = ({
              data = {}
            }) => {
              const requestId = data.requestId,
                    result = _objectWithoutProperties(data, ["requestId"]);

              if (requestId === uniqRequestId) {
                resolve(result);
                this.unsubscribe(subscriptions);
              }
            }; // Create dynamic listener method


            const listener = {
              [method]: onSuccess,
              [DEFAULT_ERROR_CHANNEL]: onError
            }; // Ad-Hoc subscription

            this.subscribe(prefix, listener, subscriptions); // Publish message on channel

            this.publish(channel, _objectSpread({}, parameters, {
              requestId: uniqRequestId
            }));
          });
        };
      }
      /**
       * Get a publisher for a task service that return a promise
       * @param {() => string} prefix - Channel prefix
       * @param {string} namespace - Namespace
       * @return {Function} publisher
       */


      getAsyncTaskPublisher(prefix, namespace = '') {
        return (name, ...parameters) => {
          const channel = `${prefix()}/${DEFAULT_TASK_CHANNEL}`;
          const uniqRequestId = this.getUniqRequestId();
          const subscriptions = {};
          return new Promise((resolve, reject) => {
            const onError = ({
              data = {}
            }) => {
              const requestId = data.requestId,
                    code = data.code,
                    message = data.message;

              if (requestId === uniqRequestId) {
                reject({
                  message,
                  code
                });
                this.unsubscribe(subscriptions);
              }
            };

            const onSuccess = ({
              data = {}
            }) => {
              const result = data.result,
                    requestId = data.requestId;

              if (requestId === uniqRequestId) {
                resolve(result);
                this.unsubscribe(subscriptions);
              }
            }; // Create dynamic listener method


            const listener = {
              [DEFAULT_TASK_CHANNEL]: onSuccess,
              [DEFAULT_ERROR_CHANNEL]: onError
            }; // Ad-Hoc subscription

            this.subscribe(prefix, listener, subscriptions); // Publish message on channel

            this.publish(channel, {
              data: {
                name,
                namespace,
                parameters
              },
              requestId: uniqRequestId
            });
          });
        };
      }
      /**
       * Get client id
       * @return {string} clientId
       */


      getClientId() {
        return this.cometd.getClientId();
      }
      /**
       * Get CometD handshake parameters
       * @return {Object}
       */


      getHandshakeFields() {
        const handshake = this.authentication();
        return handshake.getHandshakeFields(this);
      }
      /**
       * Get a publisher for a macro service
       * @param {() => string} prefix - Channel prefix
       * @return {Function} publisher
       */


      getMacroPublisher(prefix) {
        return (name, parameters, hardFail = false, debug = 1) => {
          const channel = `${prefix()}/call`;
          const requestId = this.getUniqRequestId();
          return this.publish(channel, {
            debug,
            hardFail,
            name,
            parameters,
            requestId
          });
        };
      }
      /**
       * Get queued subscription index
       * @return {Object} index
       */


      getQueuedSubscription(subscriptions = {}) {
        const index = this.subscribeQueue.findIndex(element => subscriptions === element.subscriptions);
        return {
          index,
          queued: index > -1
        };
      }
      /**
       * Get resource
       * @return {string}
       */


      getResource() {
        return this.resource;
      }
      /**
       * Get sandbox id
       * @return {string}
       */


      getAppName() {
        return this.appName;
      }
      /**
       * Get server urls list
       * @return {Array<string>} servers
       */


      getServers() {
        if (this.config) {
          return this.config.servers;
        } else {
          return [];
        }
      }
      /**
       * Get a publisher for a service
       * @param {() => string} prefix - Channel prefix
       * @return {Function} publisher
       */


      getServicePublisher(prefix) {
        return (method, parameters) => {
          const channel = `${prefix()}/${method}`;
          return this.publish(channel, parameters);
        };
      }
      /**
       * Get uniq request id
       * @return {string}
       */


      getUniqRequestId() {
        return `${this.getClientId()}:${this.uniqId}:${++this.requestId}`;
      }
      /**
       * Get user id
       * @return {string}
       */


      getUserId() {
        return this.userId;
      }
      /**
       * Get user info
       * @return {Objet}
       */


      getUserInfo() {
        return this.userInfo;
      }
      /**
       * Manage handshake failure case
       */


      handshakeFailure() {
        this.userId = null;
        this.userInfo = null;
      }
      /**
       * Notify listeners when connection is established
       */


      initialized(authentication) {
        if (authentication) {
          this.userId = authentication.userId;
          this.userInfo = authentication.userInfo;
        }

        this.connectionListeners.filter(({
          enabled
        }) => enabled).forEach(({
          listener
        }) => {
          listener.onSuccessfulHandshake(authentication);
        });
      }
      /**
       * Is client connected to ZetaPush
       * @return {boolean}
       */


      isConnected() {
        return !this.cometd.isDisconnected();
      }
      /**
       * Notify listeners when a message is lost
       */


      messageLost(channel, data) {
        this.cometd._debug('ClientHelper::messageLost', channel, data);

        this.connectionListeners.filter(({
          enabled
        }) => enabled).forEach(({
          listener
        }) => {
          listener.onMessageLost(channel, data);
        });
      }
      /**
       * Negociate authentication
       * @param {error} error
       */


      negotiationFailed(error, ext) {
        this.cometd._debug('ClientHelper::negotiationFailed', error, ext);

        this.connectionListeners.filter(({
          enabled
        }) => enabled).forEach(({
          listener
        }) => {
          listener.onNegotiationFailed(error, ext);
        });
      }
      /**
       * Notify listeners when no server url available
       */


      noServerUrlAvailable() {
        this.cometd._debug('ClientHelper::noServerUrlAvailable');

        this.connectionListeners.filter(({
          enabled
        }) => enabled).forEach(({
          listener
        }) => {
          listener.onNoServerUrlAvailable();
        });
      }
      /**
       * Wrap CometdD publish method
       * @param {String} channel
       * @param {Object} parameters
       * @return {Object}
       */


      publish(channel, parameters = {}) {
        this.cometd.publish(channel, parameters);
        return {
          channel,
          parameters
        };
      }
      /**
       * Remove a connection status listener
       */


      removeConnectionStatusListener(handler) {
        const listener = this.connectionListeners[handler];

        if (listener) {
          listener.enabled = false;
        }
      }
      /**
       * Set a new authentication methods
       * @param {function():AbstractHandshake} authentication
       */


      setAuthentication(authentication) {
        this.authentication = authentication;
      }
      /**
       * Set logging level for CometD client
       * Valid values are the strings 'error', 'warn', 'info' and 'debug', from
       * less verbose to more verbose.
       * @param {string} level
       */


      setLogLevel(level) {
        this.cometd.setLogLevel(level);
      }
      /**
       * Subsribe all methods defined in the listener for the given prefixed channel
       * @param {() => string} prefix - Channel prefix
       * @param {Object} listener
       * @param {Object} subscriptions
       * @return {Object} subscriptions
       */


      subscribe(prefix, listener = {}, subscriptions = {}) {
        const _this$getQueuedSubscr = this.getQueuedSubscription(subscriptions),
              queued = _this$getQueuedSubscr.queued;

        if (!queued) {
          // Store arguments to renew subscriptions on connection
          this.subscribeQueue.push({
            prefix,
            listener,
            subscriptions
          });
        } // Subscribe if user is connected


        if (!this.cometd.isDisconnected()) {
          for (let method in listener) {
            if (listener.hasOwnProperty(method)) {
              if (subscriptions[method] === void 0) {
                const channel = `${prefix()}/${method}`;
                subscriptions[method] = this.cometd.subscribe(channel, listener[method]);
              }
            }
          }
        }

        return subscriptions;
      }
      /**
       * Remove current server url from the server list and shuffle for another one
       */


      updateServerUrl() {
        const servers = this.getServers();
        const index = servers.indexOf(this.serverUrl);

        if (index > -1) {
          servers.splice(index, 1);
        }

        if (servers.length === 0) {
          // No more server available
          this.noServerUrlAvailable();
        } else {
          this.serverUrl = shuffle(servers);
          this.cometd.configure({
            url: `${this.serverUrl}/strd`
          });
          setTimeout(() => {
            this.cometd.handshake(this.getHandshakeFields());
          }, UPDATE_SERVER_URL_DELAY);
        }
      }
      /**
       * Remove all subscriptions
       * @param {Object} subscriptions
       */


      unsubscribe(subscriptions = {}) {
        // Unsubscribe
        for (let method in subscriptions) {
          if (subscriptions.hasOwnProperty(method)) {
            const subscription = subscriptions[method];
            this.cometd.unsubscribe(subscription);
          }
        } // Remove subscription from queue


        const _this$getQueuedSubscr2 = this.getQueuedSubscription(subscriptions),
              index = _this$getQueuedSubscr2.index,
              queued = _this$getQueuedSubscr2.queued;

        if (queued) {
          this.subscribeQueue.splice(index, 1);
        }
      }

    }

    class BaseError extends Error {
      constructor(name, message, cause) {
        super(message);
        this.cause = cause;
        this.name = name;
      }

      toString() {
        return `${this.getType(this)}${this.message}${this.getCauseString()}`;
      }

      getType(error) {
        return `[${error.name || 'raw error'}] `;
      }

      getCauseString() {
        if (!this.cause) {
          return '';
        }

        return `\nCause: ${this.cause instanceof BaseError ? this.cause.toString() : this.getTypedCauseMessage(this.cause)}`;
      }

      getTypedCauseMessage(error) {
        return `${this.getType(error)}${error.message || error}`;
      }

    }
    /**
     * Analyze a technical error to provide a more understandable error for end-users and developers.
     *
     * @param {any} error The error to analyze
     * @param {any} context Any additional information about the execution context that may be useful for error analysis
     * @param {Object} ext Any object provided by the server
     * @returns {Promise} a promise that returns a formatted error
     */

    const analyze = (error, context, ext) => {
      return defaultAnalyzer().analyze(error, context, ext);
    };

    const defaultAnalyzer = () => new ErrorAnalyzer(new AccountStatusAnalyzer(), new AuthenticationErrorAnalyzer(), new ConnectionErrorAnalyzer());

    class ErrorAnalyzer {
      constructor(...delegates) {
        this.delegates = delegates;
      }

      async analyze(error, context, ext) {
        for (let delegate of this.delegates) {
          const analyzed = await delegate.analyze(error, context, ext);

          if (analyzed) {
            return analyzed;
          }
        }

        return error;
      }

    }

    class AccountStatusAnalyzer {
      async analyze(error, context, ext) {
        // if not an error due to account inactive => skip
        if (context !== 'CONNECTION_FAILED' || !this.isAccountInactive(error, ext)) {
          return null;
        }

        if (this.isAccountNotConfirmed(ext)) {
          return new AccountNotConfirmedError(`AccountNotConfirmedError`, `Your account has been created but you haven't confirmed it yet`, error, ext);
        } else {
          return new AccountDisabledError(`AccountDisabledError`, `Your account has been disabled`, error, ext);
        }
      }

      isAccountInactive(error, ext) {
        if (!ext || !ext.error) {
          return false;
        }

        return error === '403::Handshake denied' && ext.error.code === 'ACCOUNT_INACTIVE';
      }

      isAccountNotConfirmed(ext) {
        // TODO: works only with standard status. How to provide custom status ?
        const cause = ext.error.cause;

        const _ref = cause || {},
              context = _ref.context;

        const _ref2 = context || {},
              status = _ref2.status;

        return status && status.data === 'WAITING_FOR_CONFIRMATION';
      }

    }

    class AuthenticationErrorAnalyzer {
      async analyze(error, context, ext) {
        // if not an error due to authentication failure => skip
        if (context !== 'CONNECTION_FAILED' || !this.isAuthenticationFailed(error)) {
          return null;
        }

        if (this.isBadCredentials(ext)) {
          return new BadCredentialsError(`BadCredentialsError`, `The login and/or password are incorrect`, error, ext);
        }

        if (this.isAuthenticationTokenNotFound(ext)) {
          return new AuthenticationTokenNotFoundError(`AuthenticationTokenNotFoundError`, `The authentication token doesn't exist`, error, ext);
        }

        return null;
      }

      isAuthenticationFailed(error) {
        return error === '403::Handshake denied';
      }

      isBadCredentials(ext) {
        return ext.error.code === 'SIMPLE_UNMATCHED_LOGIN_PASSWORD';
      }

      isAuthenticationTokenNotFound(ext) {
        return ext.error.code === 'TOKEN_NOT_FOUND';
      }

    }

    class ConnectionErrorAnalyzer {
      async analyze(error, context, ext) {
        // if not an error due to connection error => skip
        if (context !== 'CONNECTION_FAILED') {
          return null;
        }

        if (this.isNetworkError(error)) {
          // TODO: add more useful information
          return new ConnectionEstablishmentFailed(`ConnectionEstablishmentFailed`, `Unable to establish connection to the platform`, error);
        }

        return new ConnectionError(`ConnectionError`, `Failed to connect to the platform`, new PlatformError(`PlatformError`, error));
      }

      isNetworkError(error) {
        return error.message === 'Negotiation Failed' || error.message === 'No Server Url Available';
      }

    }

    class PlatformError extends BaseError {
      constructor(name, rawError) {
        const cause = rawError.cause ? new PlatformError(rawError.cause) : null;
        super(name, rawError, cause);
        this.message = rawError.message;
        this.code = rawError.code;
      }

    }
    class ConnectionError extends BaseError {
      constructor(name, message, cause, ext) {
        super(name, message, cause);
        this.ext = ext;
      }

    }
    class AccountNotConfirmedError extends ConnectionError {}
    class AccountDisabledError extends ConnectionError {}
    class BadCredentialsError extends ConnectionError {}
    class AuthenticationTokenNotFoundError extends BadCredentialsError {}
    class ConnectionEstablishmentFailed extends ConnectionError {}

    /**
     * Client config object.
     * @typedef {Object} ClientConfig
     * @property {string} platformUrl - Platform Url
     * @property {string} appName - Application name
     * @property {boolean} forceHttps - Force end to end HTTPS connection
     * @property {function():AbstractHandshake} authentication - Return authentication properties
     * @property {string} resource - Client resource id
     * @property {Transports} transports - Client transports implementation
     */

    /**
     * ZetaPush Client to connect
     * @access public
     * @example
     * // Securized client with token based connection
     * const client = new ZetaPushClient.Client({
     *   appName: '<YOUR-APP-NAME>',
     *   authentication() {
     *     return ZetaPushClient.Authentication.weak({
     *       token: null
     *    })
     *   }
     * })
     * @example
     * // Client with authentication based connection
     * const client = new ZetaPushClient.Client({
     *   appName: '<YOUR-APP-NAME>',
     *   authentication() {
     *     return ZetaPushClient.Authentication.simple({
     *       login: '<USER-LOGIN>',
     *       password: '<USER-PASSWORD>'
     *    })
     *   }
     * })
     * @example
     * // Explicit deploymentId
     * const clientSimple = new ZetaPushClient.Client({
     *   appName: '<YOUR-APP-NAME>',
     *   authentication() {
     *     return ZetaPushClient.Authentication.simple({
     *       deploymentId: '<YOUR-SIMPLE-AUTHENTICATION-DEPLOYMENT-ID>',
     *       login: '<USER-LOGIN>',
     *       password: '<USER-PASSWORD>'
     *    })
     *   }
     * })
     * const clientWeak = new ZetaPushClient.Client({
     *   appName: '<YOUR-APP-NAME>',
     *   authentication() {
     *     return ZetaPushClient.Authentication.weak({
     *       deploymentId: '<YOUR-WEAK-AUTHENTICATION-DEPLOYMENT-ID>',
     *       token: '<SESSION-TOKEN>'
     *    })
     *   }
     * })
     */

    class Client {
      /**
       * Create a new ZetaPush Client
       * @param {ClientConfig} config
       */
      constructor({
        platformUrl = API_URL,
        appName,
        forceHttps = FORCE_HTTPS,
        authentication,
        resource,
        transports
      } = {}) {
        /**
         * @access private
         * @type {ClientHelper}
         */
        this.helper = new ClientHelper({
          platformUrl,
          appName,
          forceHttps,
          authentication,
          resource,
          transports
        });
      }
      /**
       * Add a connection listener to handle life cycle connection events
       * @param {ConnectionStatusListener} listener
       * @return {number} handler
       */


      addConnectionStatusListener(listener) {
        return this.helper.addConnectionStatusListener(listener);
      }
      /**
       * Safely connect client to ZetaPush
       * @return {Promise}
       */


      connect() {
        return new Promise((resolve, reject) => {
          let handler = null;
          this.disconnect().then(() => {
            const onSucess = () => {
              // Remove connection status listener
              this.removeConnectionStatusListener(handler); // Resolve connection success

              resolve();
            };

            const onError = (error, ext) => {
              // Remove connection status listener
              this.removeConnectionStatusListener(handler); // Reject connection (analyze raw error before)

              analyze(error, 'CONNECTION_FAILED', ext).then(reject);
            }; // Register connection status listener


            handler = this.addConnectionStatusListener({
              onConnectionBroken: onError,
              onConnectionClosed: onError,
              onConnectionEstablished: onSucess,
              onConnectionToServerFail: onError,
              onConnectionWillClose: onError,
              onFailedHandshake: onError,
              onNegotiationFailed: () => onError(new Error('Negotiation Failed')),
              onNoServerUrlAvailable: () => onError(new Error('No Server Url Available'))
            }); // Connect client to ZetaPush backend

            this.helper.connect();
          });
        });
      }
      /**
       * Create a promise based service instance
       * @param {{deploymentId: string, listener: Object, timeout: number, Type: class}} parameters
       * @return {Object} service
       * @example
       * const stack = client.createAsyncService({
       *   Type: Stack
       * })
       * stack.push({
       *   message: Hello'
       * }).then((result) => {
       *   console.log(result)
       * })
       */


      createAsyncService({
        deploymentId,
        listener,
        timeout,
        Type
      }) {
        return this.helper.createAsyncService({
          deploymentId,
          listener,
          timeout,
          Type
        });
      }
      /**
       * Create a promise based macro service instance
       * @param {{deploymentId: string, listener: Object, timeout: number, Type: class}} parameters
       * @return {Object} service
       * @example
       * const api = client.createAsyncMacroService({
       *   Type: WelcomeMacro
       * })
       * api.welcome({
       *   message: Hello'
       * }).then(({ message }) => {
       *   console.log(message)
       * })
       */


      createAsyncMacroService({
        deploymentId,
        listener,
        timeout,
        Type
      }) {
        return this.helper.createAsyncMacroService({
          deploymentId,
          listener,
          timeout,
          Type
        });
      }
      /**
       * Create a promise based task service instance
       * @param {{deploymentId: string, namespace: string, timeout: number, Type: class}} parameters
       * @return {Object} service
       * @example
       * const api = client.createAsyncMacroService({
       *   Type: WelcomeMacro
       * })
       * api.welcome({
       *   message: Hello'
       * }).then(({ message }) => {
       *   console.log(message)
       * })
       */


      createAsyncTaskService({
        deploymentId,
        namespace = '',
        timeout,
        Type
      }) {
        return this.helper.createAsyncTaskService({
          deploymentId,
          namespace,
          timeout,
          Type
        });
      }
      /**
       * Create a generic proxified macro service
       * Each property of the proxified service wrap a publish/subscribe
       * Publish parameters on channel --> /service/${appName}/${deploymentId}/call
       * Subscribe success on channel --> /service/${appName}/${deploymentId}/${method}
       * Subscribe error on channel --> /service/${appName}/${deploymentId}/error
       * If remote method publish response on a specific channel, generic proxy will not raise success
       * @example
       * const service = client.createProxyMacroService();
       * service.myMethod({ key: 'value' }).then((response) => console.log('myMethod', response))
       * @param {{deploymentId: string, timeout: number}} parameters
       * @return {Proxy} proxy
       * @throws {Error} Throw error if Proxy class is not defined
       */


      createProxyMacroService({
        deploymentId,
        timeout
      } = {}) {
        return this.helper.createProxyMacroService({
          deploymentId,
          timeout
        });
      }
      /**
       * Create a generic proxified task service
       * Each property of the proxified service wrap a publish/subscribe
       * Publish parameters on channel --> /service/${appName}/${deploymentId}/call
       * Subscribe success on channel --> /service/${appName}/${deploymentId}/${method}
       * Subscribe error on channel --> /service/${appName}/${deploymentId}/error
       * If remote method publish response on a specific channel, generic proxy will not raise success
       * @example
       * const service = client.createProxyTaskService();
       * service.myMethod({ key: 'value' }).then((response) => console.log('myMethod', response))
       * @param {{deploymentId: string, namespace: string, timeout: number}} parameters
       * @return {Proxy} proxy
       * @throws {Error} Throw error if Proxy class is not defined
       */


      createProxyTaskService({
        deploymentId,
        namespace = '',
        timeout
      } = {}) {
        return this.helper.createProxyTaskService({
          deploymentId,
          namespace,
          timeout
        });
      }
      /**
       * Create a generic proxified service
       * Each property of the proxified service wrap a publish/subscribe
       * Publish parameters on channel --> /service/${appName}/${deploymentId}/${method}
       * Subscribe success on channel --> /service/${appName}/${deploymentId}/${method}
       * Subscribe error on channel --> /service/${appName}/${deploymentId}/error
       * If remote method publish response on a specific channel, generic proxy will not raise success
       * @example
       * const service = client.createProxyService('');
       * service.myMethod({ key: 'value' }).then((response) => console.log('myMethod', response))
       * @param {{deploymentId: string, timeout: number}} parameters
       * @return {Proxy} proxy
       * @throws {Error} Throw error if Proxy class is not defined
       */


      createProxyService({
        deploymentId,
        timeout
      } = {}) {
        return this.helper.createProxyService({
          deploymentId,
          timeout
        });
      }
      /**
       * Create a publish/subscribe for a service type
       * @param {{listener: Object, Type: class, deploymentId: string}} parameters
       * @return {Object} service
       * @example
       * const service = client.createService({
       *   listener: {
       *     list(message) {
       *       console.log('Stack list callback', message)
       *     },
       *     push(message) {
       *       console.log('Stack push callback', message)
       *     }
       *   },
       *   Type: ZetaPushClient.services.Stack
       * })
       * service.list({
       *   stack: '<STACK-ID>'
       * })
       * @example
       * // Explicit deploymentId
       * // Authentication provide optional deployment id, according to the following convention `${ServiceType.toLowerCase()_0}`
       * const service = client.createService({
       *   deploymentId: 'stack_0'
       *   listener: {
       *     list(message) {
       *       console.log('Stack list callback', message)
       *     },
       *     push(message) {
       *       console.log('Stack push callback', message)
       *     }
       *   },
       *   Type: ZetaPushClient.services.Stack
       * })
       * service.list({
       *   stack: '<STACK-ID>'
       * })
       */


      createService({
        deploymentId,
        listener,
        Type
      }) {
        return this.helper.createService({
          deploymentId,
          listener,
          Type
        });
      }
      /**
       * Disconnect client from ZetaPush
       * @return {Promise}
       */


      disconnect() {
        return new Promise((resolve, reject) => {
          const handlers = [];

          if (this.isConnected()) {
            const onConnectionClosed = () => {
              // Remove connection status listener
              handlers.forEach(handler => {
                this.removeConnectionStatusListener(handler);
              }); // Resolve disconnection

              resolve();
            };

            handlers.push(this.onConnectionClosed(onConnectionClosed)); // Disconnect client

            this.helper.disconnect();
          } else {
            // Resolve disconnection
            resolve();
          }
        });
      }
      /**
       * Is client connected to ZetaPush
       * @return {boolean}
       */


      isConnected() {
        return this.helper.isConnected();
      }
      /**
       * Get the client sandbox id
       * @return {string}
       */


      getAppName() {
        return this.helper.getAppName();
      }
      /**
       * Get the client resource
       * @return {string}
       */


      getResource() {
        return this.helper.getResource();
      }
      /**
       * Get server urls list
       * @return {Promise} servers
       */


      getServers() {
        return this.helper.getServers();
      }
      /**
       * Get the client user id
       * @return {string}
       */


      getUserId() {
        return this.helper.getUserId();
      }
      /*
       * Get the client user info
       * @return {Object}
       * @example
       * // Create new ZetaPush Client
       * const client = new Client({
       *   appName: '<YOUR-APP-NAME>',
       *   authentication: () => Authentication.simple({
       *     login: '<YOUR-USER-LOGIN>',
       *     password: '<YOUR-USER-PASSWORD>'
       *   })
       * })
       * client.connect().then(() => {
       *   console.log('connected')
       *   const profile = client.getUserInfo()
       *   console.log('Your profile', profile)
       * })
       */


      getUserInfo() {
        return this.helper.getUserInfo();
      }
      /**
       * Remove a connection status listener
       * @param {number} handler
       */


      removeConnectionStatusListener(handler) {
        return this.helper.removeConnectionStatusListener(handler);
      }
      /**
       * Set a new authentication methods
       * @param {function():AbstractHandshake} authentication
       */


      setAuthentication(authentication) {
        this.helper.setAuthentication(authentication);
      }
      /**
       * Set logging level
       * Valid values are the strings 'error', 'warn', 'info' and 'debug', from
       * less verbose to more verbose.
       * @param {string} level
       */


      setLogLevel(level) {
        this.helper.setLogLevel(level);
      }
      /**
       * Set new client resource value
       * @param {string} resource
       */


      setResource(resource) {
        this.helper.setResource(resource);
      }
      /**
       * Remove all subscriptions
       * @param {Object} service
       */


      unsubscribe(service) {
        if (!service.$subscriptions) {
          throw new TypeError('Missing $subscriptions property in service');
        }

        return this.helper.unsubscribe(service.$subscriptions);
      }

    }
    /**
     * Add shorthand connection status method
     */

    Object.getOwnPropertyNames(ConnectionStatusListener.prototype).forEach(method => {
      // Only implements unsupported methods
      if (!Client.prototype.hasOwnProperty(method)) {
        Client.prototype[method] = function addListener(listener) {
          return this.addConnectionStatusListener({
            [method]: listener
          });
        };
      }
    });

    /**
     * SmartClient deployment infos.
     * @typedef {Object} SmartClientDeployment
     * @property {string} simple - Simple deployment id
     * @property {string} weak - Weak deployment id
     */

    /**
     * SmartClient config object.
     * @typedef {Object} SmartClientConfig
     * @property {string} platformUrl - Platform Url
     * @property {SmartClientDeployment} deployment - Deployment infos
     * @property {string} appName - Application name
     * @property {boolean} forceHttps - Force end to end HTTPS connection
     * @property {string} resource - Client resource id
     * @property {Array} transports - Client transports list
     */

    /**
     * @access public
     * @extends {Client}
     * @example
     * // Create a new WeakClient
     * const client = new ZetaPushClient.SmartClient({
     *   appName: '<YOUR-APP-NAME>'
     * })
     */

    class SmartClient extends Client {
      /**
       * Create a new ZetaPush SmartClient
       * @param {SmartClientConfig} config
       */
      constructor({
        platformUrl,
        deployment,
        appName,
        forceHttps,
        resource,
        transports
      } = {}) {
        const persistence = new SessionPersistenceStrategy({
          appName
        });
        /**
         * @return {AbstractHandshakeManager}
         */

        const authentication = () => {
          // Ensure application name is the current one
          persistence.setAppName(this.getAppName());
          const session = persistence.get();
          const token = session.token;

          if (this.hasCredentials()) {
            const _this$getCredentials = this.getCredentials(),
                  login = _this$getCredentials.login,
                  password = _this$getCredentials.password;

            this.setCredentials({});
            return Authentication.simple({
              login,
              password,
              deploymentId: deployment && deployment.simple
            });
          } else {
            if (this.isStronglyAuthenticated(session)) {
              return Authentication.simple({
                login: token,
                password: null,
                deploymentId: deployment && deployment.simple
              });
            } else {
              return Authentication.weak({
                token,
                deploymentId: deployment && deployment.weak
              });
            }
          }
        }; // Initialize base client


        super({
          platformUrl,
          appName,
          authentication,
          forceHttps,
          resource,
          transports
        });
        /**
         * @access protected
         * @type {SessionPersistenceStrategy}
         */

        this.persistence = persistence;
        /**
         * @access protected
         * @type {Object}
         */

        this.credentials = {};
        /**
         * Handle connection lifecycle events
         * @access protected
         * @type {Object}
         */

        this.lifeCycleConnectionHandler = this.addConnectionStatusListener({
          onConnectionClosed() {
            persistence.set({});
          },

          onSuccessfulHandshake(session) {
            if (session.token) {
              persistence.set(session);
            }
          }

        }); // Properly disconnect client to avoir ghost connections

        /*
        window.addEventListener('beforeunload', () => {
          this.removeConnectionStatusListener(this.lifeCycleConnectionHandler)
          super.disconnect()
        })
        */
      }
      /**
       * @return {Object}
       */


      getCredentials() {
        return this.credentials;
      }
      /**
       * @return {Object}
       */


      getSession() {
        return this.persistence.get();
      }
      /**
       * @return {boolean}
       */


      hasCredentials() {
        const _this$getCredentials2 = this.getCredentials(),
              login = _this$getCredentials2.login,
              password = _this$getCredentials2.password;

        return login && password;
      }
      /**
       * @return {boolean}
       */


      isStronglyAuthenticated(session = this.persistence.get()) {
        return !this.isWeaklyAuthenticated(session) && typeof session.token === 'string';
      }
      /**
       * @return {boolean}
       */


      isWeaklyAuthenticated(session = this.persistence.get()) {
        return typeof session.publicToken === 'string';
      }
      /**
       * @param {{login: string, password: string}} parameters
       */


      setCredentials({
        login,
        password
      }) {
        this.credentials = {
          login,
          password
        };
      }

    }

    /**
     * WeakClient config object.
     * @typedef {Object} WeakClientConfig
     * @property {string} platformUrl - Platform Url
     * @property {string} deploymentId - Authentication deployment id, default value is 'weak_0'
     * @property {string} appName - Application name
     * @property {boolean} forceHttps - Force end to end HTTPS connection
     * @property {string} resource - Client resource id
     * @property {Array} transports - Client transports list
     */

    /**
     * @access public
     * @extends {Client}
     * @example
     * // Create a new WeakClient
     * const client = new ZetaPushClient.WeakClient({
     *   appName: '<YOUR-APP-NAME>'
     * })
     * @example
     * // Explicit deploymentId
     * // WeakClient provide optional deployment id, according to the following convention `${ServiceType.toLowerCase()_0}`
     * // deploymentId default value is weak_0
     * const client = new ZetaPushClient.WeakClient({
     *   deploymentId: 'weak_0',
     *   appName: '<YOUR-APP-NAME>'
     * })
     */

    class WeakClient extends Client {
      /**
       * Create a new ZetaPush WeakClient
       * @param {WeakClientConfig} config
       */
      constructor({
        platformUrl,
        appName,
        deploymentId,
        forceHttps,
        resource,
        transports
      } = {}) {
        const authentication = () => {
          const token = this.getToken();
          const handshake = Authentication.weak({
            deploymentId,
            token
          });
          return handshake;
        };
        /**
         * Call Client constructor with specific parameters
         */


        super({
          platformUrl,
          appName,
          forceHttps,
          authentication,
          resource,
          transports
        }); // Handle successful handshake

        const onSuccessfulHandshake = ({
          publicToken,
          userId,
          token
        }) => {
          if (token) {
            this.strategy.set({
              publicToken,
              userId,
              token
            });
          }
        };

        this.addConnectionStatusListener({
          onSuccessfulHandshake
        });
        /**
         * @access private
         * @type {SessionPersistenceStrategy}
         */

        this.strategy = new SessionPersistenceStrategy({
          appName
        });
      }
      /**
       * @return {string} The stored token
       */


      getToken() {
        const _this$strategy$get = this.strategy.get(),
              token = _this$strategy$get.token;

        return token;
      }

    }

    /**
     * SDK Version
     * @type {string}
     */

    const VERSION = '0.4.0';

    exports.VERSION = VERSION;
    exports.Authentication = Authentication;
    exports.ConnectionStatusListener = ConnectionStatusListener;
    exports.Client = Client;
    exports.SmartClient = SmartClient;
    exports.WeakClient = WeakClient;
    exports.uuid = uuid;
    exports.BaseError = BaseError;
    exports.analyze = analyze;
    exports.PlatformError = PlatformError;
    exports.ConnectionError = ConnectionError;
    exports.AccountNotConfirmedError = AccountNotConfirmedError;
    exports.AccountDisabledError = AccountDisabledError;
    exports.BadCredentialsError = BadCredentialsError;
    exports.AuthenticationTokenNotFoundError = AuthenticationTokenNotFoundError;
    exports.ConnectionEstablishmentFailed = ConnectionEstablishmentFailed;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=zetapush-client.js.map
