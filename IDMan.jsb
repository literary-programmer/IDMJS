JFW Script File                                                           �?  �    getselectionstate           Options   IndicateSelected      getstringoptiondefaultsetting     stringtoint '                   getobjectstate  '       '     %    stringlength          
       Not Selected    '        '     %        
  # 0%       
  
     %     	      %        
  # l%        
  
     %     	      %        
     %     	               	         �    getfilesavedpath          '   $  ghdownloadslist $  globalfocuswindow   
  # � $  gicurrentrowindex         
  
  # �    $  ghdownloadslist $  gicurrentrowindex          lvgetitemtext     Complete    
  
        $  ghdownloadslist $  gicurrentrowindex     
     lvgetitemtext   '      %     	     stringleft    Downloads   
          %1\%2        userprofile   getenvironmentvariable  %     formatstring    '         %      	      H    indownloadslist    $  globalfocuswindow   '  %        
          getfocus    '        %    getwindowclass    SysListView32   
  # �    %    getcontrolid      �  
  
  # �      ispccursor  
  #      userbufferisactive    
  # 4     menusactive       
  
     $  globalfocuswindow   &  ghdownloadslist $  gicurrentrowindex         
        $  ghdownloadslist   lvgetfocusitem  &  gicurrentrowindex      $  gicurrentcolindex         
          &  gicurrentcolindex              	               	      �     setcolumn       %   &  gicurrentcolindex      $  ghdownloadslist $  gicurrentcolindex     lvgetcolumnheader   &  gscurrentheader %     	                reportcurrentrow              reportcurrentrow         $  gicurrentrowindex   '  %       
           &  giannouncecurrentrow       $  gicurrentcolindex        
  " � %     
          getselectionstate   '            %1 %2         %     $  ghdownloadslist %         lvgetitemtext     sayformattedmessage       $  gicurrentcolindex        
             $  gscurrentheader         saymessage                $  ghdownloadslist %  $  gicurrentcolindex     lvgetitemtext           saymessage        $  gicurrentcolindex        
  " d%       
  
               %1 of %2             $  gicurrentrowindex     inttostring       $  ghdownloadslist   lvgetitemcount    inttostring   sayformattedmessage          �     autostartevent  -   &  downloadwindows            getcurrentwindow      getappmainwindow      gettoplevelwindow   &  twin          &  resume        &  size          &  url      &  giannouncecurrentrow       p    monitornewtexteventalerts                %    getcontrolid        
  # � $  gsoldtext   %  
  
             %          saymessage     %  &  gsoldtext         %    stringlength         
  # ,   %         stringright   %   
  
           %    getwindowclass    saystring               �     namechangedevent                 isdownloadwindow             %   %  %  %  %  %    default::namechangedevent            �    focuschangedeventex               indownloadslist # p %   $  ghdownloadslist 
  
     $  giannouncecurrentrow         
        $  ghdownloadslist   lvgetfocusitem  &  gicurrentrowindex        reportcurrentrow               &  giannouncecurrentrow             %   %  %  %  %  %  %    default::focuschangedeventex             (     saynonhighlightedtext          �     windowdestroyedevent          %     dectohex    '     $  downloadwindows %    collectionitemexists          $  downloadwindows %    collectionremoveitem             %     default::windowdestroyedevent         �     copytext          %     stringlength    # \      getclipboardtext    %   
  
        %     copytoclipboard              Copied to clipboard   copied    saymessage             beep             �     getdownloadstatus      $  globalfocuswindow     getappmainwindow    '      %          getwindowtext   '  %     	      �     getwin            $  globalfocuswindow     gettoplevelwindow   %   %    findwindowwithclassandid    '  %                	      %     	         �     initdownloadwindow     $  globalfocuswindow     getappmainwindow    '      %     dectohex    '     $  downloadwindows %    collectionitemexists         -   '  %  %  $  downloadwindows /        �     isdownloadwindow                  getcurrentwindow      getappmainwindow      gettoplevelwindow     msctls_progress32     z    findwindowwithclassandid            initdownloadwindow             	               	      �     getdownloadinfo         Static  %     getwin  '     %    getwindowname   '     %    stringlength         
        %          getwindowtext   '     %     	          processpercentage            '     %     ()    stringcontainschars             %     (          stringsegment               substring     stringtoint '          %1 percent     %    inttostring   formatstring       	      0     processresumecapability    %      	      L    processtimeleft    %     (unknown)   
     %      	            '       '     %           stringsegmentcount  '     %     (s)         stringreplacesubstrings '   %       
        %         %    stringsegment   '     %         %       
    stringsegment   '     %    stringtoint      
       s   '           '     %    min 
       minute  '     %    Sec 
       second  '     %       
          %1 %2%3 %  %  %    formatstring    '          %1 %2%3 %  %  %    formatstring    '     %       
  '   �       %    stringlength         
       and '          getverbosity         
     1 MSGTimeLeftL%1 %2 %3    ' 	    1 MSGTimeLeftS%1, %3  ' 	       % 	 %  %  %    formatstring       	      �    saydownloadinformation             isdownloadwindow          %    getdownloadinfo '  %  '     %    stringlength          %  %    callfunctionbyname  '     %  # �      issamescript    
  # %    (unknown)   
  
        %    copytext                    %1
%2    %2  %   %    sayformattedmessage               	           scriptcalled                   	      d     scriptcalled         saycurrentscriptkeylabel            typecurrentscriptkey          �    sayconnectioninfo           isdownloadwindow            SysListView32     �    getwin  '  %        %    lvgetitemcount  %   
        %  %          lvgetitemtext   '     %  %          lvgetitemtext   '     %  %          lvgetitemtext   '            %1. %2
%3    %2
%3  %  %  %    sayformattedmessage                  scriptcalled             �     selectitem     %         
     $  gicurrentrowindex   '         $  ghdownloadslist %          lvsetfocusitem        $  ghdownloadslist %          lvselectitem          �    $clicktoolbaritem                 getcurrentwindow      getappmainwindow      gettoplevelwindow     ToolbarWindow32    �    findwindowwithclassandid    '         '  %           '       '  %  %  
     %     %   %    tbgetitemtext   
    |   
  '  %       
  '   �       %     %    stringlength         
    stringleft  '     %    Select Tool Bar Item to Click               dlgselectiteminlist '  %        %   %    clicktoolbaritembyindex                    You are not in downloads list     Not in downloads list     saymessage           �     $enter       getfilesavedpath    '        '     %     fileexists           '       "   %   
    "   
    run       %          Enter     performscriptbyname          X     $scriptfilename      Internet download manager     scriptandappnames         �     $jawsend         indownloadslist                   setcolumn              JAWSEnd   performscriptbyname       �     $jawshome        indownloadslist                   setcolumn              JAWSHome      performscriptbyname           $pausestart      isdownloadwindow                     getcurrentwindow      getappmainwindow      gettoplevelwindow     Button    �    findwindowwithclassandid    '      %   %  %  %  %    getwindowrect              $selectcurrentitem        @     $sayconnection1           sayconnectioninfo         @     $sayconnection2           sayconnectioninfo         @     $sayconnection3           sayconnectioninfo         @     $sayconnection4           sayconnectioninfo         @     $sayconnection5           sayconnectioninfo         @     $sayconnection6           sayconnectioninfo         @     $sayconnection7           sayconnectioninfo         @     $sayconnection8           sayconnectioninfo         @     $sayconnection9      	     sayconnectioninfo         D     $sayconnection10         
     sayconnectioninfo         �     $saydownloadedfile       File downloaded   {          saydownloadinformation            scriptcalled             �     $saydownloadingspeed         Downloading Speed               saydownloadinformation            scriptcalled             �     $saydownloadstatus       Downloading status              saydownloadinformation            scriptcalled             �    $sayfilename         isdownloadwindow             '              getfocus      getappmainwindow                  getwindowtextex '     %    %     stringcontains     %        
     %        
  '      %  %          substring         
        %     %    stringlength    %   
    stringright '       '       �          %    saystring            �     $sayfilesize         File size     �         saydownloadinformation            scriptcalled                  $saynextcharacter        indownloadslist    $  gicurrentcolindex      $  ghdownloadslist   lvgetnumofcolumns   
        $  gicurrentcolindex        
    setcolumn              beep                  SayNextCharacter      performscriptbyname              $saynextline         indownloadslist    $  gicurrentrowindex      $  ghdownloadslist   lvgetitemcount  
     $  gicurrentrowindex        
  &  gicurrentrowindex                         reportcurrentrow            issamescript    # ($  gisfid       
  
        $  gisfid    unschedulefunction           &  gisfid          SelectItem               schedulefunction    &  gisfid          beep                  SayNextLine   performscriptbyname          �     $saypercentage       File downloaded   {          ProcessPercentage     saydownloadinformation            scriptcalled             �     $saypriorcharacter       indownloadslist    $  gicurrentcolindex        
        $  gicurrentcolindex        
    setcolumn              beep                  SayPriorCharacter     performscriptbyname          �    $saypriorline        indownloadslist    $  gicurrentrowindex        
     $  gicurrentrowindex        
  &  gicurrentrowindex                         reportcurrentrow            issamescript    # $  gisfid       
  
        $  gisfid    unschedulefunction           &  gisfid          SelectItem               schedulefunction    &  gisfid          beep                  SayPriorLine      performscriptbyname          �     $sayresumecapability         Resume capability     �          ProcessResumeCapability   saydownloadinformation            scriptcalled             �     $saytimeleft         Time left     }          ProcessTimeLeft   saydownloadinformation            scriptcalled             �     $tab            getfocus      getcontrolid      �  
          ok    saystring              $tab          p     $sayurl      URL   �         saydownloadinformation            scriptcalled             �     $saywindowtitle      isdownloadwindow            SayTopLineOfWindow    performscriptbyname            SayWindowTitle    performscriptbyname          �    $ocrselectedfile         getfilesavedpath    '        OCR   PrimaryRecognitionLanguage    	         readsettinginteger  '       OCR   SecondaryRecognitionLanguage      	         readsettinginteger  '        '       getrunningfsproducts         
       	           canrecognize         
             1 * OCR component is not installed on your system. Please check your internet connection and run the %product% setup again Or Contact Freedom Scientific Technical Support. 1  OCR component is not installed.   sayformattedmessage    	      $  globalocrjobid             1  Recognition job is already in progress. Please either wait until the prior job is finished or cancel it.    1 
 Recognition job is already in progress.   saymessage     	         %   %  %  $  globalocrjobid    recognizefile   '  %        
             1 msg_OCRDocumentStarted_LDocument OCR started.   1 MSG_OCRStarted_Sstarted.      saymessage        %       
             1  OCR Failed to start. No file currently selected.      sayformattedmessage       %       
             1  OCR Failed to start. Multiple files currently selected.   sayformattedmessage       %       
             1  OCR Failed to start. Unsupported file currently selected.     sayformattedmessage               1 MSG_OCR_PDF_FAILED_TO_StartOCR Failed to start.   sayformattedmessage          �    $picturesmartwithselectedfile        OCR   PrimaryRecognitionLanguage    	         readsettinginteger  '        OCR   SecondaryRecognitionLanguage      	         readsettinginteger  '        '       getrunningfsproducts         
       	      $  globalocrjobid             1  Recognition job is already in progress. Please either wait until the prior job is finished or cancel it.    1 
 Recognition job is already in progress.   saymessage     	           ispicturesmartenabled        	                istelemetryenabled  '  %       
             1  Not available without license activation.     saymessage        %        
     	              getfocus    %   %  $  globalocrjobid    describeselectedfile    '  %       
             1  Not available without license activation.     saymessage        %       
             1  Picture Smart failed to start. No file currently selected.    sayformattedmessage       %       
             1  Picture Smart failed to start. Multiple files currently selected.     sayformattedmessage       %       
             1  Picture Smart failed to start. Unsupported file currently selected.   sayformattedmessage       %        
             1 msg_picturesmart_failedtostartPicture Smart failed to start.      sayformattedmessage          t     $test      $  globalfocuswindow     sayinteger             getfilesavedpath      saystring         