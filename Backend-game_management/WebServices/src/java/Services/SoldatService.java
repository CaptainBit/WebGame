package Services;



import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import SQLSoldat.Soldat;
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

}