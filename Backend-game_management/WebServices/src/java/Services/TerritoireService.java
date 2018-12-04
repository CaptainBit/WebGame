package Services;



import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import SQLTerritoire.Territoire;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import org.json.JSONArray;
import org.json.JSONObject;
/**
 * REST Web Service
 *
 * @author admin
 */
@Path("Territoire")
public class TerritoireService {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of GenericResource
     */
    public TerritoireService() {
    }

    
    @GET
    @Path("All")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAll() {
    
        Territoire territoire = new Territoire();
        
        JSONArray json = territoire.getAllTerritoire();
        
        return json.toString();
    }
    
    @GET
    @Path("getTerritoirePlayer")
    @Produces(MediaType.APPLICATION_JSON)
    public String getTerritoirePlayer(@QueryParam("userName") String userName) {
    
        Territoire territoire = new Territoire();
        
        JSONArray json = territoire.getTerritoirePlayer(userName);
        
        return json.toString();
    }
    
    @GET
    @Path("Attaque")
    @Produces(MediaType.APPLICATION_JSON)
    public String Attaque(
            @QueryParam("idSoldats") String idSoldats, 
            @QueryParam("idTerritoire") int idTerritoire, 
            @QueryParam("userName") String userName) 
    {
    
        Territoire territoire = new Territoire();

        List<Integer> lstId =  new ArrayList<Integer>();
        for(String id : idSoldats.split(",")){
            lstId.add(Integer.valueOf(id));
        };
        
        boolean win = territoire.Attack(lstId, idTerritoire, userName);
        
        return String.valueOf(win);
    }
    
    @GET
    @Path("AddTerritoire")
    @Produces(MediaType.APPLICATION_JSON)
    public boolean AddTeritoire(
            @QueryParam("userName") String userName, 
            @QueryParam("nomTerritoire") int idTerritoire, 
            @QueryParam("eau") int eau ,
            @QueryParam("argent") int argent,
            @QueryParam("nourriture") int nourriture,
            @QueryParam("science") int science)
    {
    
        
    }
    

}