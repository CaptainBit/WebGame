/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Services;

import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import SQLPlayer.AccountPlayer;
import org.json.JSONObject;

import SQLPlayer.AccountAdministration;
import org.json.JSONArray;
/**
 * REST Web Service
 *
 * @author admin
 */
@Path("Player")
public class GenericResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of GenericResource
     */

    /**
     * Retrieves representation of an instance of Player.GenericResource
     * @param userName
     * @return an instance of java.lang.String
     */
    @GET
    @Path("Connect")
    @Produces(MediaType.APPLICATION_JSON)
    public String getConnection(@QueryParam("userName") String userName,@QueryParam("password") String password ) {
        JSONObject json;
        AccountPlayer cp = new AccountPlayer();
        json = cp.GetConnection(userName, password);
        
        return json.toString();
    }
    
    @GET
    @Path("CreateAccount")
    @Produces(MediaType.APPLICATION_JSON)
    public String setAccount(@QueryParam("userName") String userName,@QueryParam("password") String password ) {
        AccountPlayer cp = new AccountPlayer();
        boolean reponse = cp.CreateAccount(userName, password);
        
        return String.valueOf(reponse);
    }
    
    @GET
    @Path("GetRessource")
    @Produces(MediaType.APPLICATION_JSON)
    public String getRessource(@QueryParam("userName") String userName ) {
        JSONObject json;
        AccountPlayer cp = new AccountPlayer();
        json = cp.getRessourcePlayer(userName);
        
        return json.toString();
    }
    
    @GET
    @Path("GetAllPlayers")
    @Produces (MediaType.APPLICATION_JSON)
    public String getAllPlayers()
    {
        JSONArray json;
        AccountAdministration admin = new AccountAdministration();
        json = admin.GetAllPlayer();
        return json.toString(); 
        
    }
    
    @GET
    @Path("DeleteAPlayer")
    @Produces (MediaType.APPLICATION_JSON)
    public String deletAPlayer(@QueryParam("id") int id)
    {
        JSONArray json;
        AccountAdministration admin = new AccountAdministration();
        boolean deleted = admin.DeleteAPlayer(id);
        return String.valueOf(deleted); 
        
    }

}
