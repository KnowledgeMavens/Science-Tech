from ipywidgets import HBox, VBox, Dropdown
import numpy as np
from bqplot.marks import Scatter, Bars
from bqplot.scales import LinearScale, OrdinalScale
from bqplot.figure import Figure
from bqplot import Tooltip
from bqplot.axes import Axis
import numpy as np


# simple function to return the bins for the plot
def get_h_bins(df, bins, f_lim):
    if f_lim:
        return np.arange(f_lim['min'], f_lim['max'], (f_lim['max']-f_lim['min'])/float(bins))
    scale_max = int(df.describe().loc['max'].max()+1)
    scale_min = int(df.describe().loc['min'].min()-1)   
    return np.arange(scale_min, scale_max, (scale_max-scale_min)/float(bins))

def feature_vector_distribution(features, label_column,
                                bins=25,
                                group_columns=None, 
                                f_lim=None,
                                colors=None):
    """
    features (dataframe): a data frame of feature vectors along with a label column and other metadata
    label_column (str): the name of the column in the features dataframe that refers to the label infomration
    bins (int): the number of bins in the histograms
    group_columns (list): if you want other metadata in the tooltip, these columns will be added
    f_lim (dict): this sets the limits for max and min of the plots to a constant 
        {'max':10, 'min':10}. otherwise defaults to the values of the current features 
        which can be missleading. 
    colors (list): list of colors to use. Internally has a list of 10. If the labels
        are longer you will need to pass your own
    
    """
    dist = unicode("640px")
    third_dist = unicode("213px")

    if f_lim:
        sc_x = LinearScale(min=f_lim['min'], max=f_lim['max'])
        sc_y = LinearScale(min=f_lim['min'], max=f_lim['max'])
    else:
        sc_x = LinearScale()
        sc_y = LinearScale()
 

    scale_y = LinearScale(min=0)
    
    x_ord_legend = OrdinalScale()
    y_lin_legend = LinearScale()
    
    if group_columns is None:
        count_column = features.columns[1]
        group_columns = []
    else:
        count_column = group_columns[0]

    if colors is None:
        colors = ["#E6B0AA","#C39BD3","#73C6B6","#F7DC6F","#F0B27A","#D0D3D4", "#85929E", "#6E2C00", "#1A5276", "#17202A"]
    box_color = 'black'
    
    feature_x = Dropdown(description='Feature 1')
    feature_y = Dropdown(description='Feature 2')

    feature_x.options = [x for x in features.columns if x not in [label_column]+group_columns]
    feature_y.options = [x for x in features.columns if x not in [label_column]+group_columns]

    feature1 = feature_x.options[0]
    feature2 = feature_y.options[1]

    tt = Tooltip(fields=['name'], labels=[', '.join(['index', label_column]+group_columns)])
    
    scatters = []
    hists_y = []
    hists_x = []


    h_bins_x = get_h_bins(features[[feature1]], bins, f_lim)
    h_bins_y = get_h_bins(features[[feature2]], bins, f_lim)

    for index, group in enumerate(features.groupby([label_column])):
        
        # put the label column and any group column data in the tooltip
        names = []
        for row in range(group[1].shape[0]):
            names.append('{},'.format(row)+','.join([str(x) for x in group[1][[label_column]+group_columns].iloc[row].values]))
            
        # create a scatter plot for each group
        scatters.append(Scatter(x=group[1][feature1].values,
                                y=group[1][feature2].values,
                                names=names,
                                display_names=False,
                                default_opacities=[0.5],
                                default_size=30,
                                scales={'x': sc_x, 'y': sc_y}, 
                                colors=[colors[index]],
                                tooltip=tt,
                                ))
        
        # create a histograms using a bar chart for each group
        # histogram plot for bqplot does not have enough options (no setting range, no setting orientation)
        h_y, h_x = np.histogram(group[1][feature1].values, bins=h_bins_x)
        hists_x.append(Bars(x=h_x,
                            y=h_y,
                            opacities=[0.3]*bins,
                            scales={'x': sc_x, 'y': scale_y},
                            colors=[colors[index]],
                            orientation='vertical'))
        
        
        h_y, h_x = np.histogram(group[1][feature2].values, bins=h_bins_y)
        hists_y.append(Bars(x=h_x,
                            y=h_y,
                            opacities=[0.3]*bins,
                            scales={'x': sc_x, 'y': scale_y},
                            colors=[colors[index]],
                            orientation='horizontal'))
        

    # legend will show the names of the labels as well as a total count of each
    legend_bar = Bars(x=features.groupby(label_column).count()[count_column].index,
               y=features.groupby(label_column).count()[count_column].values,
               colors=colors,
               opacities=[0.3]*6,
               scales={'x': x_ord_legend, 'y':y_lin_legend},
               orientation='horizontal')

    ax_x_legend = Axis(scale=x_ord_legend, 
                tick_style={'font-size':24}, 
                label='', 
                orientation='vertical',
                tick_values=features.groupby(label_column).count()[count_column].index)

    ax_y_legend = Axis(scale=y_lin_legend,
                       orientation='horizontal',
                       label='Total', 
                       color=box_color,
                       num_ticks=4)

    #these are blank blank axis that are used to fill in the boarder for the top and right of the figures
    ax_top = Axis(scale=sc_x, color=box_color, side='top', tick_style={'font-size':0})
    ax_right = Axis(scale=sc_x, color=box_color, side='right', tick_style={'font-size':0})
    ax_left = Axis(scale=sc_x, color=box_color,  side='left', tick_style={'font-size':0})
    ax_bottom = Axis(scale=sc_x, color=box_color, side='bottom', tick_style={'font-size':0})

    #scatter plot axis
    ax_x = Axis(label=feature1, scale=sc_x, color=box_color)
    ax_y = Axis(label=feature2, scale=sc_y, orientation='vertical', color=box_color)

    #count column of histogram
    ax_count_vert  = Axis(label='', scale=scale_y, orientation='vertical', color=box_color, num_ticks=5)
    ax_count_horiz = Axis(label='', scale=scale_y, orientation='horizontal', color=box_color, num_ticks=5)

    #histogram bin axis
    ax_hist_x = Axis(label='', scale=sc_x, orientation='vertical', color=box_color)
    ax_hist_y = Axis(label='', scale=sc_x, orientation='horizontal', color=box_color)

    #create figures for each plot
    f_scatter = Figure(axes=[ax_x, ax_y, ax_top, ax_right],
                       background_style={'fill':'white'}, #css is inserted directly
                       marks=scatters, 
                       min_aspect_ratio=1,
                       max_aspect_ratio=1,
                       fig_margin =  {"top":0, "bottom":60, "left":60, "right":0},
                       )

    f_hists_y = Figure(axes=[ax_left, ax_count_horiz, ax_top, ax_right], 
                       background_style={'fill':'white'},
                       marks=hists_y, 
                       min_aspect_ratio=.33,
                       max_aspect_ratio=.33,
                       fig_margin =  {"top":0, "bottom":60, "left":10, "right":0},
                      )

    f_hists_x = Figure(axes=[ax_count_vert, ax_bottom,  ax_top, ax_right],
                       background_style={'fill':'white'}, 
                       marks=hists_x,
                       min_aspect_ratio=3, 
                       max_aspect_ratio=3,
                       fig_margin =  {"top":20, "bottom":10, "left":60, "right":0},
                      )

    f_legend = Figure(marks=[legend_bar], axes=[ax_x_legend, ax_y_legend], title='',
                                 legend_location ='bottom-right',
                                 background_style = {'fill':'white'},
                                 min_aspect_ratio=1,
                                 max_aspect_ratio=1,
                                 fig_margin =  {"top":10, "bottom":30, "left":20, "right":20})


    # we already set the ratios, but it is necessary to set the size explicitly anyway
    # this is kind of cool, inserts this into the style in html
    f_legend.layout.height = third_dist
    f_legend.layout.width = third_dist
    f_hists_x.layout.height = third_dist
    f_hists_x.layout.width = dist
    f_hists_y.layout.height = dist
    f_hists_y.layout.width = third_dist
    f_scatter.layout.height = dist
    f_scatter.layout.width = dist

    # we create some functions that allow changes when the widgets notice an event
    def change_x_feature(b):
        h_bins_x = get_h_bins(features[[feature_x.value]], bins, f_lim)
        for index, group in enumerate(features.groupby([label_column])):
            scatters[index].x = group[1][feature_x.value]
            h_y, h_x = np.histogram(group[1][feature_x.value].values, bins=h_bins_x)
            hists_x[index].y = h_y

        ax_x.label = feature_x.value

    def change_y_feature(b):
        h_bins_y = get_h_bins(features[[feature_y.value]], bins, f_lim)
        for index, group in enumerate(features.groupby([label_column])):
            scatters[index].y = group[1][feature_y.value]
            h_y, h_x = np.histogram(group[1][feature_y.value].values, bins=h_bins_y)
            hists_y[index].y = h_y

        ax_y.label = feature_y.value

    # when the user selects a different feature, switch the data plotted
    feature_x.observe(change_x_feature, 'value')
    feature_y.observe(change_y_feature, 'value')

    #return the stacked figures to be plotted
    return VBox([ HBox([feature_x, feature_y]),
           HBox([f_hists_x, f_legend]), 
           HBox([f_scatter, f_hists_y])])
