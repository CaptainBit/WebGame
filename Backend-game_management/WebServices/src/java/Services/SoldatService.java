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

}