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
    public GenericResource() {
    }

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
        JSONObject json;
        AccountPlayer cp = new AccountPlayer();
        json = cp.CreateAccount(userName, password);
        
        return json.toString();
    }

}
