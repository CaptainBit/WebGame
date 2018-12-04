package Services;



import SQLGun.Guns;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import SQLGun.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import org.json.JSONArray;
import org.json.JSONObject;
/**
 * REST Web Service
 *
 * @author admin
 */
@Path("Guns")
public class GunService {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of GenericResource
     */
    public GunService() {
    }

    
    @GET
    @Path("Type")
    @Produces(MediaType.APPLICATION_JSON)
    public String getType() {
    
        Type gun = new Type();
        
        JSONArray json = gun.getAllTypes();
        
        return json.toString();
    }
    
    @GET
    @Path("GunPlayer")
    @Produces(MediaType.APPLICATION_JSON)
    public String getPlayerGun(@QueryParam("userName") String userName) {
    
        Guns gun = new Guns();
        
        JSONArray json = gun.getAllGuns(userName);
        
        return json.toString();
    }
    
    @GET
    @Path("EditArmeSoldat")
    @Produces(MediaType.APPLICATION_JSON)
    public String EditArmeSoldat(@QueryParam("idArme") int idArme, @QueryParam("idSoldat") int idSoldat) {
    
        Guns arme = new Guns();
        
        boolean result = arme.EditArmeSoldat(idArme, idSoldat);
        
        return String.valueOf(result);
    }
    
    @GET
    @Path("DeleteArme")
    @Produces(MediaType.APPLICATION_JSON)
    public String DeleteArme(@QueryParam("idArme") int idArmure, @QueryParam("idType") int idType, @QueryParam("userName") String userName) {
    
        Guns armure = new Guns();
        
        boolean result = armure.DeleteArme(idArmure, idType,userName);
        
        return String.valueOf(result);
    }
    
    @GET
    @Path("AddArme")
    @Produces(MediaType.APPLICATION_JSON)
    public String AddArme(@QueryParam("userName") String userName, @QueryParam("idType") int idType) {
    
        Guns armure = new Guns();
        
        boolean result = armure.AddArme(userName, idType);
        
        return String.valueOf(result);
    }
    
    @GET
    @Path("EditTypeArme")
    @Produces(MediaType.APPLICATION_JSON)
    public String EditTypeArme(
            @QueryParam("id") int id, 
            @QueryParam("nom") String nom, 
            @QueryParam("nourriture") int nourriture,
            @QueryParam("eau") int eau,
            @QueryParam("argent") int argent,
            @QueryParam("science") int science,
            @QueryParam("force") int force)

    {
    
        TypeAdmin typeArme = new TypeAdmin();
        
        boolean win = typeArme.EditTypeArme(id, nom, nourriture, eau, argent, science, force);
        
        return String.valueOf(win);
    }
    
    @GET
    @Path("DeleteTypeArme")
    @Produces(MediaType.APPLICATION_JSON)
    public String DeleteTypeArme(
            @QueryParam("id") int id) 

    {
    
        TypeAdmin typeArme = new TypeAdmin();
        
        boolean win = typeArme.DeleteTypeArme(id);
        
        return String.valueOf(win);
    }
    
    @GET
    @Path("AddTypeArme")
    @Produces(MediaType.APPLICATION_JSON)
    public String AddTypeArme(
            @QueryParam("nom") String nom, 
            @QueryParam("nourriture") int nourriture,
            @QueryParam("eau") int eau,
            @QueryParam("argent") int argent,
            @QueryParam("science") int science,
            @QueryParam("force") int force)
    {
    
        TypeAdmin typeArme = new TypeAdmin();
        
        boolean win = typeArme.AddTypeArme(nom, nourriture, eau, argent, science, force);
        
        return String.valueOf(win);
    }

}