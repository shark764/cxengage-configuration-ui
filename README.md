# cxengage-configuration-ui
CxEngage Configuration and Reporting

`npm install` to get your dependencies

`npm start` to start working on a HMR local dev instance

`npm run build` to get a static site version built

`npm t` runs the tests which are comming soon



Transition/Migration info

In Angular config-ui add a script to the bottom of the page

```

<script type="text/javascript">
      window.addEventListener('message',function(event) {
        console.warn('Parent window received a message:  ' + event.data,event);
        event.source.postMessage({
          sdkState: CxEngage.dumpState(), 
          token: localStorage.getItem('LIVEOPS-SESSION-KEY'),
          prefrence: localStorage.getItem('LIVEOPS-PREFRENCE-KEY'),
        },'http://127.0.0.1:8080');
      },false);
    </script>

```
NOTE: if the script ^^ caused gulp --watch to not work , you can comment out the watch functions in the gulp watch.js until we have a better solution



You would also need an iframe where your angular page would be so silentMonitoring.html:
```
<div id="main-content">
  <div id="table-pane">

    <iframe src="http://127.0.0.1:8080" width="100%" height="99%" scrolling="no" style="overflow:hidden;"></iframe>

    <!-- <table-controls
      config="tableConfig"
      items="interactions"
      greater-or-less-than="greaterOrLessThan"
      search-query="searchQuery">
    </table-controls>

    <lo-resource-table
      config="tableConfig"
      items="interactions"
      selected="selectedInteraction"
      greater-or-less-than="greaterOrLessThan"
      search-query="searchQuery">
    </lo-resource-table> -->
  </div>
</div>

```
