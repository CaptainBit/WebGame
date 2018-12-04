package Services;



import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import SQLSoldat.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import org.json.JSONArray;
import org.json.JSONObject;
/**
 * REST Web Service
 *
 * @author admin
 */
@Path("Soldat")
public class SoldatService {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of GenericResource
     */
    public SoldatService() {
    }

    
    @GET
    @Path("getSoldatPlayerSansTerritoire")
    @Produces(MediaType.APPLICATION_JSON)
    public String getSoldatPlayerSansTerritoire(@QueryParam("userName") String userName) {
    
        Soldat soldat = new Soldat();
        
        JSONArray json = soldat.getSoldatPlayerSansTerritoire(userName);
        
        return json.toString();
    }
    
    @GET
    @Path("getSoldatPlayer")
    @Produces(MediaType.APPLICATION_JSON)
    public String getSoldatPlayer(@QueryParam("userName") String userName) {
    
        Soldat soldat = new Soldat();
        
        JSONArray json = soldat.getSoldatPlayer(userName);
        
        return json.toString();
    }
    
    @GET
    @Path("Type")
    @Produces(MediaType.APPLICATION_JSON)
    public String Type() {
    
        Soldat soldat = new Soldat();
        
        JSONArray json = soldat.getTypeSoldat();
        
        return json.toString();
    }
    
    @GET
    @Path("AddSoldat")
    @Produces(MediaType.APPLICATION_JSON)
    public String AddSoldat(@QueryParam("userName") String userName, @QueryParam("idType") int idType) {
    
        Soldat soldat = new Soldat();
        
        boolean json = soldat.AddSoldat(userName, idType);
        
        return String.valueOf(json);
    }
    
    @GET
    @Path("DeleteSoldat")
    @Produces(MediaType.APPLICATION_JSON)
    public String DeleteSoldat(@QueryParam("idSoldat") int idSoldat, @QueryParam("idType") int idType, @QueryParam("userName") String userName) {
    
        Soldat soldat = new Soldat();
        
        boolean json = soldat.DeleteSoldat(idSoldat, idType, userName);
        
        return String.valueOf(json);
    }
    
    @GET
    @Path("EditTerritoireSoldat")
    @Produces(MediaType.APPLICATION_JSON)
    public String EditTerritoireSoldat(
            @QueryParam("idSoldat") int idSoldat, 
            @QueryParam("idTerritoire") int idTerritoire) {
    
        Soldat soldat = new Soldat();
        
        boolean json = soldat.EditTerritoireSoldat(idSoldat, idTerritoire);
        
        return String.valueOf(json);
    }
    
    @GET
    @Path("EditTypeSoldat")
    @Produces(MediaType.APPLICATION_JSON)
    public String EditTypeSoldat(
            @QueryParam("id") int id, 
            @QueryParam("nom") String nom, 
            @QueryParam("nourriture") int nourriture,
            @QueryParam("eau") int eau,
            @QueryParam("argent") int argent,
            @QueryParam("science") int science,
            @QueryParam("force") int force,
            @QueryParam("vie") int vie)

    {
    
        TypeAdmin typeSoldat = new TypeAdmin();
        
        boolean win = typeSoldat.EditTypeSoldat(id, nom, nourriture, eau, argent, science, force, vie);
        
        return String.valueOf(win);
    }
    
    @GET
    @Path("DeleteTypeSoldat")
    @Produces(MediaType.APPLICATION_JSON)
    public String DeleteTypeSoldat(
            @QueryParam("id") int id) 

    {
    
        TypeAdmin typeSoldat = new TypeAdmin();
        
        boolean win = typeSoldat.DeleteTypeSoldat(id);
        
        return String.valueOf(win);
    }
    
    @GET
    @Path("AddTypeSoldat")
    @Produces(MediaType.APPLICATION_JSON)
    public String AddTypeSoldat(
            @QueryParam("nom") String nom, 
            @QueryParam("nourriture") int nourriture,
            @QueryParam("eau") int eau,
            @QueryParam("argent") int argent,
            @QueryParam("science") int science,
            @QueryParam("force") int force,
            @QueryParam("vie") int vie)
    {
    
        TypeAdmin typeSoldat = new TypeAdmin();
        
        boolean win = typeSoldat.AddTypeSoldat(nom, nourriture, eau, argent, science, force, vie);
        
        return String.valueOf(win);
    }

}