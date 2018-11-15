function addBarCodeReaderRegion (
    p_region              in apex_plugin.t_region,
    p_plugin              in apex_plugin.t_plugin,
    p_is_printer_friendly in boolean )
return apex_plugin.t_region_render_result
is
    -- constants
    c_video_id    varchar2(100) := 'bcreaderVideo';
    c_canvas_id   varchar2(100) := 'bcreaderVideoCanvas';
    -- dummy result
    l_result      apex_plugin.t_region_render_result;
begin
    -- render the video canvas for the scanner
    htp.p('<canvas id="'||c_canvas_id||'" width="320" height="240"> <video id ="'||c_video_id||'"/></canvas>');
    -- init javascript for ApExBCReader
    apex_javascript.add_inline_code( p_code => 'ApExBCReader.Init();'
                                   , p_key  => 'apexbcr_plugin' );
    -- 
    return l_result;
end addBarCodeReaderRegion;